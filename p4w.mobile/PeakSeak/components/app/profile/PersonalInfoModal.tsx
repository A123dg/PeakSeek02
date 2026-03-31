import React from "react";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { DatePickerUI } from "@/components/app/DatePicker";

type PersonalInfoModalProps = {
  draftDob: Date;
  draftEmail: string;
  draftName: string;
  isLoading: boolean;
  onAvatarPress: () => void;
  onClose: () => void;
  onDateChange: (value: Date) => void;
  onEmailChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onSave: () => void;
  selectedAvatarUri: string | null;
  visible: boolean;
};

export const PersonalInfoModal = ({
  draftDob,
  draftEmail,
  draftName,
  isLoading,
  onAvatarPress,
  onClose,
  onDateChange,
  onEmailChange,
  onNameChange,
  onSave,
  selectedAvatarUri,
  visible,
}: PersonalInfoModalProps) => (
  <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.card}>
        <View style={styles.handle} />
        <View style={styles.header}>
          <Text style={styles.title}>Cap nhat thong tin</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={20} color="#334155" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.avatarSection}>
            <TouchableOpacity onPress={onAvatarPress} style={styles.avatarWrap}>
              {selectedAvatarUri ? (
                <Image source={{ uri: selectedAvatarUri }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.avatarPlaceholder]}>
                  <Text style={styles.avatarPlaceholderText}>{draftName.trim()[0] ?? "?"}</Text>
                </View>
              )}
              <View style={styles.avatarBadge}>
                <Ionicons name="camera" size={16} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
            <Text style={styles.avatarHint}>Chon anh dai dien moi</Text>
          </View>

          <Field label="Ten nguoi dung">
            <TextInput
              value={draftName}
              onChangeText={onNameChange}
              style={styles.input}
              placeholder="Nhap ten nguoi dung"
              placeholderTextColor="#94A3B8"
            />
          </Field>

          <Field label="Email">
            <TextInput
              value={draftEmail}
              onChangeText={onEmailChange}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="ban@example.com"
              placeholderTextColor="#94A3B8"
            />
          </Field>

          <DatePickerUI label="Ngay sinh" value={draftDob} onConfirm={onDateChange} maximumDate={new Date()} />

          <TouchableOpacity
            style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
            onPress={onSave}
            disabled={isLoading}
          >
            <Text style={styles.saveButtonText}>{isLoading ? "Dang luu..." : "Cap nhat thong tin"}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  </Modal>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <View style={styles.fieldWrap}>
    <Text style={styles.fieldLabel}>{label}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.32)",
    justifyContent: "flex-end",
  },
  backdrop: {
    flex: 1,
  },
  card: {
    maxHeight: "86%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
  },
  handle: {
    alignSelf: "center",
    width: 42,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#CBD5E1",
    marginBottom: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    gap: 12,
    paddingBottom: 12,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 8,
  },
  avatarWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 8,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  avatarPlaceholder: {
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarPlaceholderText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#475569",
  },
  avatarBadge: {
    position: "absolute",
    right: 2,
    bottom: 2,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  avatarHint: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  fieldWrap: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
  },
  input: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#0F172A",
  },
  saveButton: {
    marginTop: 8,
    borderRadius: 16,
    backgroundColor: "#16A34A",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});
