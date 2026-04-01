import React, { useMemo, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { TimePickerUI } from "@/components/app/TimePicker";
import { useImagePicker } from "@/hooks/useImagePicker";

type LocationFormValues = {
  locationName: string;
  description: string;
  address: string;
  addressLink: string;
  openingHours: string;
  closingHours: string;
  type: string;
  mediaUris: string[];
};

type ProfileLocationFormProps = {
  title: string;
  subtitle: string;
  submitLabel: string;
  initialValues?: Partial<LocationFormValues>;
  isSubmitting?: boolean;
  onSubmit: (values: LocationFormValues) => Promise<void> | void;
};

const typeOptions = [
  { label: "Coworking", value: "1" },
  { label: "Thư viện", value: "2" },
  { label: "Cà phê", value: "3" },
  { label: "Ngoài trời", value: "4" },
];

export const ProfileLocationForm = ({
  title,
  subtitle,
  submitLabel,
  initialValues,
  isSubmitting,
  onSubmit,
}: ProfileLocationFormProps) => {
  const [locationName, setLocationName] = useState(initialValues?.locationName ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [address, setAddress] = useState(initialValues?.address ?? "");
  const [addressLink, setAddressLink] = useState(initialValues?.addressLink ?? "");
  const [openingHours, setOpeningHours] = useState(initialValues?.openingHours ?? "08:00:00");
  const [closingHours, setClosingHours] = useState(initialValues?.closingHours ?? "22:00:00");
  const [type, setType] = useState(initialValues?.type ?? "1");
  const { images, pickImages, removeImage, loading } = useImagePicker(initialValues?.mediaUris ?? [], 5);

  const canSave = useMemo(
    () => locationName.trim() && address.trim() && type.trim(),
    [address, locationName, type]
  );

  const handleSubmit = async () => {
    if (!canSave) {
      return;
    }

    await onSubmit({
      locationName,
      description,
      address,
      addressLink,
      openingHours,
      closingHours,
      type,
      mediaUris: images,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.topBar}>
          <Pressable style={styles.iconBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={18} color="#0F172A" />
          </Pressable>

          <View style={styles.headerCopy}>
            <Text style={styles.topTitle}>{title}</Text>
            <Text style={styles.topSubtitle}>{subtitle}</Text>
          </View>

          <View style={styles.rightSpacer} />
        </View>

        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.banner}>
            <View style={styles.bannerIcon}>
              <Ionicons name="business-outline" size={18} color="#FFFFFF" />
            </View>
            <View style={styles.bannerCopy}>
              <Text style={styles.bannerTitle}>Thông tin địa điểm</Text>
              <Text style={styles.bannerSub}>Nhập đầy đủ thông tin để gửi cho hệ thống xử lý.</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.mediaHeader}>
              <View style={styles.mediaCopy}>
                <Text style={styles.cardTitle}>Ảnh địa điểm</Text>
                <Text style={styles.helperText}>Ảnh thứ 1 sẽ được xem là ảnh chính. Tối đa 5 ảnh.</Text>
              </View>

              <Pressable style={styles.mediaButton} onPress={() => void pickImages()} disabled={loading}>
                <Ionicons name="images-outline" size={16} color="#FFFFFF" />
                <Text style={styles.mediaButtonText}>{loading ? "Đang tải..." : "Chọn ảnh"}</Text>
              </Pressable>
            </View>

            {images.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.previewWrap}
              >
                {images.map((uri, index) => (
                  <View key={`${uri}-${index}`} style={styles.previewItem}>
                    <Image source={{ uri }} style={styles.previewImage} />
                    <View style={styles.previewMeta}>
                      <Text style={styles.previewOrder}>Ảnh {index + 1}</Text>
                      {index === 0 ? <Text style={styles.previewPrimary}>Ảnh chính</Text> : null}
                    </View>
                    <Pressable style={styles.removeBadge} onPress={() => removeImage(uri)}>
                      <Ionicons name="close" size={14} color="#FFFFFF" />
                    </Pressable>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <Text style={styles.helperText}>Chưa có ảnh nào. Bạn có thể bỏ qua nếu chưa cần.</Text>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Thông tin cơ bản</Text>

            <InputBlock
              label="Tên địa điểm"
              value={locationName}
              onChangeText={setLocationName}
              placeholder="Nhập tên địa điểm"
            />

            <InputBlock
              label="Mô tả"
              value={description}
              onChangeText={setDescription}
              placeholder="Mô tả ngắn về địa điểm"
              multiline
            />

            <InputBlock
              label="Địa chỉ"
              value={address}
              onChangeText={setAddress}
              placeholder="Nhập địa chỉ..."
              multiline
            />

            <InputBlock
              label="Link bản đồ"
              value={addressLink}
              onChangeText={setAddressLink}
              placeholder="https://maps.google.com/..."
              autoCapitalize="none"
            />

            <View style={styles.typeSection}>
              <Text style={styles.inputLabel}>Loại địa điểm</Text>
              <View style={styles.typeGrid}>
                {typeOptions.map((option) => {
                  const selected = type === option.value;
                  return (
                    <Pressable
                      key={option.value}
                      style={[styles.typeChip, selected && styles.typeChipSelected]}
                      onPress={() => setType(option.value)}
                    >
                      <Text style={[styles.typeChipText, selected && styles.typeChipTextSelected]}>
                        {option.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={styles.hoursRow}>
              <View style={styles.flex}>
                <TimePickerUI label="Mở cửa lúc" value={openingHours} onConfirm={setOpeningHours} />
              </View>
              <View style={styles.flex}>
                <TimePickerUI label="Đóng cửa lúc" value={closingHours} onConfirm={setClosingHours} />
              </View>
            </View>

            <View style={styles.helperRow}>
              <Ionicons name="information-circle-outline" size={14} color="#64748B" />
              <Text style={styles.helperText}>Định dạng giờ: hh:mm:ss. Ví dụ: 08:00:00</Text>
            </View>
          </View>

          <View style={styles.footerInline}>
            <Pressable
              style={[styles.saveButton, (!canSave || isSubmitting) && styles.saveButtonDisabled]}
              disabled={!canSave || isSubmitting}
              onPress={() => void handleSubmit()}
            >
              <Text style={styles.saveText}>{isSubmitting ? "Đang xử lý..." : submitLabel}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

type InputBlockProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  multiline?: boolean;
  style?: object;
};

const InputBlock = ({
  label,
  value,
  onChangeText,
  placeholder,
  autoCapitalize,
  multiline,
  style,
}: InputBlockProps) => (
  <View style={style}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={[styles.inputWrap, multiline && styles.inputWrapMultiline]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, multiline && styles.inputMultiline]}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F6F7FB" },
  flex: { flex: 1 },
  topBar: {
    minHeight: 64,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F7",
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F5F9",
  },
  headerCopy: {
    flex: 1,
    paddingHorizontal: 12,
    gap: 2,
  },
  topTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
  },
  topSubtitle: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
  },
  rightSpacer: {
    width: 36,
  },
  container: {
    padding: 14,
    gap: 12,
  },
  banner: {
    borderRadius: 14,
    padding: 12,
    backgroundColor: "#5B4ED6",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  bannerIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerCopy: {
    flex: 1,
    gap: 2,
  },
  bannerTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
  bannerSub: { color: "rgba(255,255,255,0.85)", fontSize: 12, lineHeight: 18 },
  card: {
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EEF2F7",
    padding: 12,
    gap: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },
  inputLabel: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 6,
    fontWeight: "700",
  },
  inputWrap: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E8EDF5",
    backgroundColor: "#FFFFFF",
  },
  inputWrapMultiline: {
    minHeight: 84,
  },
  input: {
    minHeight: 48,
    paddingHorizontal: 12,
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "600",
  },
  inputMultiline: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  typeSection: {
    gap: 6,
  },
  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  typeChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#D7DFEA",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  typeChipSelected: {
    backgroundColor: "#DCFCE7",
    borderColor: "#86EFAC",
  },
  typeChipText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
  },
  typeChipTextSelected: {
    color: "#166534",
  },
  hoursRow: {
    flexDirection: "row",
    gap: 10,
  },
  helperRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  mediaHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  mediaCopy: {
    flex: 1,
    gap: 2,
  },
  mediaButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#0F766E",
  },
  mediaButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  helperText: {
    fontSize: 12,
    color: "#64748B",
  },
  previewWrap: {
    gap: 10,
    paddingRight: 4,
  },
  previewItem: {
    width: 260,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
  },
  previewImage: {
    width: "100%",
    height: 180,
    backgroundColor: "#E2E8F0",
  },
  previewMeta: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 4,
  },
  previewOrder: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0F172A",
  },
  previewPrimary: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#DCFCE7",
    color: "#166534",
    fontSize: 11,
    fontWeight: "800",
  },
  removeBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 23, 42, 0.72)",
  },
  footerInline: {
    paddingBottom: 12,
  },
  saveButton: {
    height: 44,
    borderRadius: 14,
    backgroundColor: "#5B4ED6",
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonDisabled: {
    opacity: 0.45,
  },
  saveText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});

