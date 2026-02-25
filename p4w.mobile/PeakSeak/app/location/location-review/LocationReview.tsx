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

const MIN_CONTENT_LENGTH = 20;

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
        <Text style={styles.headerTitle}>Viet danh gia</Text>
        <Pressable onPress={onCancelPress}>
          <Text style={styles.headerAction}>Dong</Text>
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.bodyContent}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      >
        <Pressable onPress={Keyboard.dismiss}>
          <Text style={styles.label}>Chon so sao</Text>
        </Pressable>

        <View style={styles.starRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Pressable key={star} onPress={() => setRating(star)} style={styles.starPress}>
              <Text style={[styles.star, star <= rating && styles.starActive]}>{'\u2605'}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Noi dung danh gia</Text>
        <TextInput
          style={styles.input}
          multiline
          value={content}
          onChangeText={setContent}
          placeholder="Chia se trai nghiem chi tiet de giup nguoi khac chon noi phu hop."
          placeholderTextColor={Palette.subtext}
          textAlignVertical="top"
        />

        {showError && contentLength < MIN_CONTENT_LENGTH ? (
          <Text style={styles.errorText}>Vui long nhap it nhat 20 ky tu.</Text>
        ) : null}

        <View style={styles.buttonRow}>
          <Pressable style={styles.cancelBtn} onPress={onCancelPress}>
            <Text style={styles.cancelText}>Huy</Text>
          </Pressable>

          <Pressable
            style={[styles.submitBtn, !canSubmit && styles.submitBtnDisabled]}
            disabled={!canSubmit}
            onPress={handleSubmit}
          >
            <Text style={styles.submitText}>Gui danh gia</Text>
          </Pressable>
        </View>

        {isSubmitting ? <Text style={styles.statusText}>Dang gui...</Text> : null}

        {isSubmitted ? (
          <View style={styles.successBox}>
            <Text style={styles.successText}>Da gui danh gia thanh cong!</Text>
          </View>
        ) : null}
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
