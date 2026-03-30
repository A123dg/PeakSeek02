import React, { useMemo, useState } from "react";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { TimePickerUI } from "@/components/app/TimePicker";

type LocationFormValues = {
  locationName: string;
  description: string;
  address: string;
  addressLink: string;
  openingHours: string;
  closingHours: string;
  type: string;
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
  { label: "Thu vien", value: "2" },
  { label: "Ca phe", value: "3" },
  { label: "Ngoai troi", value: "4" },
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
              <Text style={styles.bannerTitle}>Thong tin dia diem</Text>
              <Text style={styles.bannerSub}>Nhap day du thong tin de gui cho he thong xu ly.</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Thong tin co ban</Text>

            <InputBlock
              label="Ten dia diem"
              value={locationName}
              onChangeText={setLocationName}
              placeholder="Nhap ten dia diem"
            />

            <InputBlock
              label="Mo ta"
              value={description}
              onChangeText={setDescription}
              placeholder="Mo ta ngan ve dia diem"
              multiline
            />

            <InputBlock
              label="Dia chi"
              value={address}
              onChangeText={setAddress}
              placeholder="Nhap dia chi..."
              multiline
            />

            <InputBlock
              label="Link ban do"
              value={addressLink}
              onChangeText={setAddressLink}
              placeholder="https://maps.google.com/..."
              autoCapitalize="none"
            />

            <View style={styles.typeSection}>
              <Text style={styles.inputLabel}>Loai dia diem</Text>
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
                <TimePickerUI label="Mo cua luc" value={openingHours} onConfirm={setOpeningHours} />
              </View>
              <View style={styles.flex}>
                <TimePickerUI label="Dong cua luc" value={closingHours} onConfirm={setClosingHours} />
              </View>
            </View>

            <View style={styles.helperRow}>
              <Ionicons name="information-circle-outline" size={14} color="#64748B" />
              <Text style={styles.helperText}>Dinh dang gio: hh:mm:ss. Vi du: 08:00:00</Text>
            </View>
          </View>

          <View style={styles.footerInline}>
            <Pressable
              style={[styles.saveButton, (!canSave || isSubmitting) && styles.saveButtonDisabled]}
              disabled={!canSave || isSubmitting}
              onPress={() => void handleSubmit()}
            >
              <Text style={styles.saveText}>{isSubmitting ? "Dang xu ly..." : submitLabel}</Text>
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
  helperText: {
    fontSize: 12,
    color: "#64748B",
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
