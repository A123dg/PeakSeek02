import React, { useImperativeHandle, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Keyboard,
  Modal,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from 'react-native';
import { Palette } from '@/components/app/palette';
import { useImagePicker } from '@/hooks/useImagePicker';
import { Ionicons } from '@expo/vector-icons';

export type LocationReviewPayload = {
  rating: number;
  content: string;
  images?: string[];
};

export type LocationReviewBottomSheetRef = {
  present: () => void;
  dismiss: () => void;
  close: () => void;
  expand: () => void;
  snapToIndex: (index: number) => void;
};

type LocationReviewBottomSheetProps = {
  snapPoints?: string[];
  onCancelPress?: () => void;
  onSubmitPress?: (payload: LocationReviewPayload) => void | Promise<void>;
};

const MIN_CONTENT_LENGTH = 10;
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const getSnapRatio = (snapPoints?: string[]) => {
  const first = snapPoints?.[0];
  if (!first) return 0.72;
  if (first.endsWith('%')) {
    const num = Number(first.replace('%', ''));
    if (!Number.isNaN(num)) return clamp(num / 100, 0.2, 0.95);
  }
  return 0.72;
};

export const LocationReviewBottomSheet = React.forwardRef<
  LocationReviewBottomSheetRef,
  LocationReviewBottomSheetProps
>(({ snapPoints, onCancelPress, onSubmitPress }, ref) => {
  const { height } = useWindowDimensions();
  const ratio = useMemo(() => getSnapRatio(snapPoints), [snapPoints]);
  const sheetHeight = Math.round(height * ratio);

  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { images, pickImages, removeImage, resetImages } = useImagePicker();
  const translateY = useRef(new Animated.Value(sheetHeight)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const contentLength = content.trim().length;
  const canSubmit = rating > 0 && contentLength >= MIN_CONTENT_LENGTH && !isSubmitting;

  const resetToOpen = () => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 140,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const open = () => {
    setVisible(true);
    setIsSubmitted(false);
    translateY.setValue(sheetHeight);
    backdropOpacity.setValue(0);
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 240,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const close = (onDone?: () => void) => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: sheetHeight,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false);
      onDone?.();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        gestureState.dy > 12 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx),
      onPanResponderMove: (_, gestureState) => {
        const nextY = Math.max(0, gestureState.dy);
        translateY.setValue(nextY);
        backdropOpacity.setValue(1 - Math.min(nextY / sheetHeight, 1));
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > Math.max(80, sheetHeight * 0.2)) {
          close();
          return;
        }
        resetToOpen();
      },
      onPanResponderTerminate: () => {
        resetToOpen();
      },
    }),
  ).current;

  const handleSubmit = async () => {
    setShowError(true);
    if (!canSubmit) return;
    try {
      setIsSubmitting(true);
      await onSubmitPress?.({ rating, content: content.trim(), images });

      close(() => {
        setRating(0);
        setContent('');
        setShowError(false);
        setIsSubmitted(false);
        resetImages();
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      present: open,
      dismiss: () => close(),
      close: () => close(),
      expand: open,
      snapToIndex: (index: number) => {
        if (index <= 0) open();
        else close();
      },
    }),
    [sheetHeight],
  );

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={() => close()}>
      <TouchableWithoutFeedback onPress={() => close()}>
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.sheet, { height: sheetHeight, transform: [{ translateY }] }]}>
        <View style={styles.handleTouchArea} {...panResponder.panHandlers}>
          <View style={styles.handle} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.container}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          onScrollBeginDrag={Keyboard.dismiss}
        >
          {/* <Text style={styles.title}>Viet danh gia</Text> */}
          <Text style={styles.label}>Chạm để đánh giá</Text>

          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Pressable key={star} onPress={() => setRating(star)} style={styles.starPress}>
                <Text style={[styles.star, star <= rating && styles.starActive]}>{'\u2605'}</Text>
              </Pressable>
            ))}
          </View>
            <View style={styles.contentHeader}>
              <Text style={styles.label}>Noi dung</Text>

              <Pressable onPress={pickImages} style={styles.cameraBtn} hitSlop={10}>
  <Ionicons name="camera-outline" size={20} color={Palette.text} />
              </Pressable>
            </View>
          <TextInput
            style={styles.input}
            multiline
            value={content}
            onChangeText={setContent}
            placeholder="Chia sẻ trải nghiệm chi tiết của bạn..."
            placeholderTextColor={Palette.subtext}
            textAlignVertical="top"
          />

            {images.length > 0 ? (
              <View style={styles.previewWrap}>
                {images.map((uri) => (
                  <View key={uri} style={styles.previewItem}>
                    <Image source={{ uri }} style={styles.previewImage} />
                    <Pressable style={styles.removeBadge} onPress={() => removeImage(uri)}>
                      <Text style={styles.removeText}>×</Text>
                    </Pressable>
                  </View>
                ))}
              </View>
            ) : null}
          
          

          {showError && contentLength < MIN_CONTENT_LENGTH ? (
            <Text style={styles.errorText}>Vui lòng nhập ít nhất {MIN_CONTENT_LENGTH} ký tự.</Text>
          ) : null}
          
          <View style={styles.buttonRow}>
            <Pressable
              style={styles.cancelBtn}
              onPress={() =>
                close(() => {
                  onCancelPress?.();
                })
              }
            >
              <Text style={styles.cancelText}>Hủy</Text>
            </Pressable>

            <Pressable
              style={[styles.submitBtn, !canSubmit && styles.submitBtnDisabled]}
              disabled={!canSubmit}
              onPress={handleSubmit}
            >
              <Text style={styles.submitText}>Gửi đánh giá</Text>
            </Pressable>
          </View>
{/* 
          {isSubmitting ? <Text style={styles.statusText}>Đang gửi...</Text> : null}
          {isSubmitted ? <Text style={styles.successText}>Đã gửi đánh giá thành công!</Text> : null} */}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
});

LocationReviewBottomSheet.displayName = 'LocationReviewBottomSheet';

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  handleTouchArea: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  handle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#d1d5db',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 18,
    paddingBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Palette.text,
    textAlign: 'center',
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Palette.text,
    marginBottom: 8,
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  cameraBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    fontSize: 18,
  },
  starRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  starPress: {
    marginRight: 6,
  },
  star: {
    fontSize: 26,
    color: '#d1d5db',
  },
  starActive: {
    color: Palette.warning,
  },
  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    padding: 12,
    fontSize: 14,
    color: Palette.text,
  },
  previewWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  previewItem: {
    width: 72,
    height: 72,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: '#fff',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  removeBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginTop: -2,
  },
  errorText: {
    marginTop: 6,
    color: '#dc2626',
    fontSize: 12,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },
  cancelBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: Palette.text,
  },
  submitBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: Palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnDisabled: {
    opacity: 0.6,
  },
  submitText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  statusText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
    color: Palette.subtext,
  },
  successText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: Palette.success,
  },
});
