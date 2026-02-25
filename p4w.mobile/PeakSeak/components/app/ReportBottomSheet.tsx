import React, { useImperativeHandle, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Animated,
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

const reasons = [
  'Noi dung khong phu hop',
  'Spam / Quang cao',
  'Thong tin sai lech',
  'Khac',
];

export type ReportBottomSheetRef = {
  present: () => void;
  dismiss: () => void;
  close: () => void;
  expand: () => void;
  snapToIndex: (index: number) => void;
};

type ReportBottomSheetProps = {
  snapPoints?: string[];
  onCancelPress?: () => void;
  onSubmitPress?: (payload: { reason: string; note: string }) => void;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const getSnapRatio = (snapPoints?: string[]) => {
  const first = snapPoints?.[0];
  if (!first) return 0.55;
  if (first.endsWith('%')) {
    const num = Number(first.replace('%', ''));
    if (!Number.isNaN(num)) return clamp(num / 100, 0.2, 0.95);
  }
  return 0.55;
};

export const ReportBottomSheet = React.forwardRef<ReportBottomSheetRef, ReportBottomSheetProps>(
  ({ snapPoints, onCancelPress, onSubmitPress }, ref) => {
    const { height } = useWindowDimensions();
    const ratio = useMemo(() => getSnapRatio(snapPoints), [snapPoints]);
    const sheetHeight = Math.round(height * ratio);

    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const [note, setNote] = useState('');

    const translateY = useRef(new Animated.Value(sheetHeight)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;

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
          gestureState.dy > 4 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx),
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
            scrollEnabled
            showsVerticalScrollIndicator
            onScrollBeginDrag={Keyboard.dismiss}
          >
            <Pressable onPress={Keyboard.dismiss}>
              <Text style={styles.title}>Báo cáo</Text>
            </Pressable>
            <Text style={styles.label}>Lý do</Text>

            {reasons.map((item) => (
              <Pressable
                key={item}
                style={[styles.option, selected === item && styles.optionSelected]}
                onPress={() => setSelected(item)}
              >
                <View style={styles.radio}>{selected === item && <View style={styles.radioInner} />}</View>
                <Text style={styles.optionText}>{item}</Text>
              </Pressable>
            ))}

            <Text style={styles.label}>Mô tả thêm (tùy chọn)</Text>
            <TextInput
              style={styles.input}
              multiline
              placeholder="Mô tả rõ lý do báo cáo..."
              value={note}
              onChangeText={setNote}
            />

            <View style={styles.buttonRow}>
              <Pressable
                style={styles.cancelBtn}
                onPress={() =>
                  close(() => {
                    onCancelPress?.();
                  })
                }
              >
                <Text style={styles.cancelText}>Huy</Text>
              </Pressable>

              <Pressable
                style={[styles.submitBtn, !selected && { opacity: 0.5 }]}
                disabled={!selected}
                onPress={async () => {
                  if (!selected) return;
                  onSubmitPress?.({ reason: selected, note });
                  await Alert.alert("Cảm ơn bạn đã gửi báo cáo cho chúng tôi")
                }}
              >
                <Text style={styles.submitText} >Gui bao cao</Text>
              </Pressable>
            </View>
          </ScrollView>
        </Animated.View>
      </Modal>
    );
  },
);

ReportBottomSheet.displayName = 'ReportBottomSheet';

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
  handle: {
    alignSelf: 'center',
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#d1d5db',
  },
  handleTouchArea: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 28,
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionSelected: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  optionText: {
    fontSize: 14,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: Palette.primary,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Palette.primary,
  },
  input: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 12,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  cancelText: {
    fontWeight: '600',
  },
  submitBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: Palette.primary,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
  },
});
