import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AuthInput } from "@/components/app/AuthInput";
import { Palette } from "@/components/app/palette";
import { PrimaryButton } from "@/components/app/PrimaryButton";
import { useAvatarPicker } from "@/hooks/useAvatarPicker";
import { DatePickerUI } from "@/components/app/DatePicker";
import { sanitizeKeyboardInput } from "@/shared/rules/inputRules";
import { useAuth } from "@/contexts/AuthContext";

const noSpecialCharacterRule = {
  id: "NO_SPECIAL_CHARACTER",
  validate: (value: string) => /^[\p{L}\p{N}\s]*$/u.test(value),
  message: "Khong duoc nhap ky tu dac biet.",
};

export const Register = () => {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date());
  const { avatarUri, pickAvatar, removeAvatar, loading } = useAvatarPicker();

  const handleRegister = async () => {
    try {
      await register({
        email: email.trim(),
        userName: fullName.trim(),
        dateOfBirth: date.toISOString(),
        mediaLinkUrl: avatarUri ?? undefined,
      });
      Alert.alert("Thanh cong", "Tao tai khoan thanh cong, vui long dang nhap.");
      router.replace("/auth/login/Login");
    } catch (error) {
      Alert.alert("Dang ky that bai", error instanceof Error ? error.message : "Co loi xay ra");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Palette.bg} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Tao tai khoan</Text>
        </View>
        <View style={styles.avatarSection}>
          <Pressable
            onPress={pickAvatar}
            disabled={loading}
            style={({ pressed }) => [styles.avatarPressable, pressed && !loading && { opacity: 0.85 }]}
          >
            <View style={styles.avatarWrap}>
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={styles.avatarImg} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="cloud-upload-outline" size={26} color={Palette.subtext} />
                  <Text style={styles.avatarPlaceholderText}>Tai anh</Text>
                </View>
              )}

              <View style={styles.avatarBadge}>
                <Ionicons name="camera" size={14} color="#fff" />
              </View>
            </View>
          </Pressable>

          {avatarUri && (
            <Pressable
              onPress={removeAvatar}
              disabled={loading}
              style={({ pressed }) => [styles.removeBtn, pressed && !loading && { opacity: 0.85 }]}
            >
              <Ionicons name="trash-outline" size={16} color="#EF4444" />
              <Text style={styles.removeText}>Xoa anh</Text>
            </Pressable>
          )}
        </View>
        <View style={styles.card}>
          <AuthInput
            label="Ho va ten"
            placeholder="Nhap ten cua ban"
            value={fullName}
            onChangeText={setFullName}
            rules={[noSpecialCharacterRule]}
            sanitizeInput={sanitizeKeyboardInput}
          />
          <AuthInput
            label="Email"
            placeholder="ban@example.com"
            value={email}
            onChangeText={setEmail}
            required
          />
          <DatePickerUI
            label="Ngay sinh"
            value={date}
            onConfirm={(newDate) => setDate(newDate)}
            maximumDate={new Date()}
          />
          <PrimaryButton label={isLoading ? "Dang xu ly..." : "Dang ky"} onPress={handleRegister} />
          <PrimaryButton
            label="Da co tai khoan? Dang nhap"
            variant="ghost"
            style={styles.ghostButton}
            onPress={() => router.push("/auth/login/Login")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.bg,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: Palette.text,
  },
  card: {
    backgroundColor: Palette.card,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  ghostButton: {
    marginTop: 12,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 14,
  },
  avatarPressable: {
    alignItems: "center",
  },
  avatarWrap: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: Palette.card,
    borderWidth: 1,
    borderColor: Palette.border,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
  },
  avatarPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  avatarPlaceholderText: {
    fontSize: 12,
    fontWeight: "700",
    color: Palette.subtext,
  },
  avatarBadge: {
    position: "absolute",
    right: 6,
    bottom: 6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Palette.primary ?? "#16A34A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Palette.card,
  },
  removeBtn: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#FEE2E2",
    backgroundColor: "#FFF1F2",
  },
  removeText: {
    color: "#EF4444",
    fontWeight: "800",
    fontSize: 12,
  },
});
