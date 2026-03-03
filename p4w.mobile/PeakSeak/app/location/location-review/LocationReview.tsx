import { Palette } from '@/components/app/palette';
import React, { useMemo, useState } from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export type LocationReviewPayload = {
  rating: number;
  content: string;
};

type LocationReviewProps = {
  onCancelPress?: () => void;
  onSubmitPress?: (payload: LocationReviewPayload) => void | Promise<void>;
};

const MIN_CONTENT_LENGTH = 5;

export const LocationReview = ({ onCancelPress, onSubmitPress }: LocationReviewProps) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);

  const contentLength = content.trim().length;
  const canSubmit = useMemo(
    () => rating > 0 && contentLength >= MIN_CONTENT_LENGTH && !isSubmitting,
    [contentLength, isSubmitting, rating],
  );

  const handleSubmit = async () => {
    setShowError(true);
    if (!canSubmit) return;

    try {
      setIsSubmitting(true);
      await onSubmitPress?.({ rating, content: content.trim() });
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Viết đánh giá</Text>
        <Pressable onPress={onCancelPress}>
          <Text style={styles.headerAction}>Đóng</Text>
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.bodyContent}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      >
        <Pressable onPress={Keyboard.dismiss}>
          <Text style={styles.label}>Chọn số sao</Text>
        </Pressable>

        <View style={styles.starRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Pressable key={star} onPress={() => setRating(star)} style={styles.starPress}>
              <Text style={[styles.star, star <= rating && styles.starActive]}>{'\u2605'}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Nội dung đánh giá</Text>
        <TextInput
          style={styles.input}
          multiline
          value={content}
          onChangeText={setContent}
          placeholder="Chia sẻ trải nghiệm chi tiết để giúp người khác chọn nơi phù hợp."
          placeholderTextColor={Palette.subtext}
          textAlignVertical="top"
        />

        {showError && contentLength < MIN_CONTENT_LENGTH ? (
          <Text style={styles.errorText}>Vui lòng nhập ít nhất 5 ký tự.</Text>
        ) : null}

        <View style={styles.buttonRow}>
          <Pressable style={styles.cancelBtn} onPress={onCancelPress}>
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

        {/* {isSubmitting ? <Text style={styles.statusText}>Đang gửi...</Text> : null}

        {isSubmitted ? (
          <View style={styles.successBox}>
            <Text style={styles.successText}>Đã gửi đánh giá thành công!</Text>
          </View>
        ) : null} */}
      </ScrollView>
    </View>
  );
};

export default LocationReview;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Palette.card,
  },
  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Palette.border,
  },
  headerTitle: {
    color: Palette.text,
    fontSize: 16,
    fontWeight: '700',
  },
  headerAction: {
    color: Palette.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: 16,
    paddingBottom: 28,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Palette.text,
    marginBottom: 8,
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
    borderRadius: 12,
    minHeight: 120,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: Palette.border,
    fontSize: 14,
    color: Palette.text,
  },
  errorText: {
    marginTop: 6,
    color: '#dc2626',
    fontSize: 12,
    fontWeight: '600',
  },
  buttonRow: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 12,
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
    color: Palette.text,
    fontWeight: '600',
    fontSize: 14,
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
    fontWeight: '600',
    fontSize: 14,
  },
  statusText: {
    marginTop: 8,
    textAlign: 'center',
    color: Palette.subtext,
    fontSize: 12,
  },
  successBox: {
    marginTop: 16,
    alignSelf: 'center',
    backgroundColor: '#dcfce7',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  successText: {
    color: Palette.success,
    fontWeight: '700',
    fontSize: 12,
  },
});
