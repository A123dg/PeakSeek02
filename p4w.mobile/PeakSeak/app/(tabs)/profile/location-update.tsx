import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AuthInput } from '@/components/app/AuthInput';

export default function ProfileLocationUpdateScreen() {
  const [address, setAddress] = useState('12 Nguyen Huu, Quan 1, TP.HCM');
  const [openAt, setOpenAt] = useState('08:00');
  const [closeAt, setCloseAt] = useState('22:00');
  const [price, setPrice] = useState('100000');
  const canSave = address.trim().length > 0 && openAt.trim().length > 0 && closeAt.trim().length > 0;

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* TOP BAR */}
        <View style={styles.topBar}>
          <Pressable style={styles.iconBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={18} color="#0f172a" />
          </Pressable>

          <Text style={styles.topTitle}>Cập nhật địa điểm</Text>

          <View style={{ width: 36 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* BANNER */}
          <View style={styles.banner}>
            <View style={styles.bannerIcon}>
              <Ionicons name="cloud-upload-outline" size={18} color="#ffffff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerTitle}>Tải ảnh đã điền</Text>
              <Text style={styles.bannerSub}>Thêm một vài ảnh để tăng độ tin cậy.</Text>
            </View>
            <Pressable style={styles.bannerAction}>
              <Text style={styles.bannerActionText}>Tải lên</Text>
            </Pressable>
          </View>

          {/* FORM CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Thông tin cơ bản</Text>

            <InputBlock
              label="Địa chỉ"
              value={address}
              onChangeText={setAddress}
              placeholder="Nhập địa chỉ..."
            />
            <AuthInput
              label='Giá tối thiểu'
              placeholder='Nhập giá thành'
              onChangeText={setPrice}
              value={price}
            />

            <View style={styles.hoursRow}>
              <InputBlock
                style={{ flex: 1 }}
                label="Mở cửa lúc"
                value={openAt}
                onChangeText={setOpenAt}
                placeholder="08:00"
                keyboardType="numbers-and-punctuation"
              />
              <InputBlock
                style={{ flex: 1 }}
                label="Đóng cửa lúc"
                value={closeAt}
                onChangeText={setCloseAt}
                placeholder="22:00"
                keyboardType="numbers-and-punctuation"
              />
            </View>

            <View style={styles.helperRow}>
              <Ionicons name="information-circle-outline" size={14} color="#64748b" />
              <Text style={styles.helperText}>Định dạng giờ: HH:MM (ví dụ 08:00).</Text>
            </View>
          </View>

          <View style={{ height: 84 }} />
        </ScrollView>

        {/* FIXED FOOTER */}
        <View style={styles.footer}>
          <Pressable
            style={[styles.saveButton, !canSave && styles.saveButtonDisabled]}
            disabled={!canSave}
            onPress={() => router.back()}
          >
            <Text style={styles.saveText}>Lưu thay đổi</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function InputBlock({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  style,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  keyboardType?: any;
  style?: object;
}) {
  return (
    <View style={style}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrap}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f6f7fb' },

  topBar: {
    height: 52,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#eef2f7',
  },
  topTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: 0.2,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
  },

  container: {
    padding: 14,
    gap: 12,
  },

  banner: {
    borderRadius: 14,
    padding: 12,
    backgroundColor: '#5b4ed6',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bannerIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTitle: { color: '#ffffff', fontSize: 12, fontWeight: '800' },
  bannerSub: { color: 'rgba(255,255,255,0.85)', fontSize: 10, marginTop: 2 },
  bannerAction: {
    paddingHorizontal: 10,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  bannerActionText: { color: '#ffffff', fontSize: 11, fontWeight: '800' },

  card: {
    borderRadius: 14,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#eef2f7',
    padding: 12,
    gap: 10,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
  },

  inputLabel: { fontSize: 10, color: '#64748b', marginBottom: 6, fontWeight: '700' },
  inputWrap: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8edf5',
    backgroundColor: '#ffffff',
  },
  input: {
    height: 40,
    paddingHorizontal: 12,
    color: '#0f172a',
    fontSize: 12,
    fontWeight: '600',
  },

  hoursRow: { flexDirection: 'row', gap: 10 },

  helperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 2,
  },
  helperText: { fontSize: 10, color: '#64748b' },

  footer: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#eef2f7',
  },
  saveButton: {
    height: 42,
    borderRadius: 14,
    backgroundColor: '#5b4ed6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.45,
  },
  saveText: { color: '#ffffff', fontSize: 13, fontWeight: '800' },
});