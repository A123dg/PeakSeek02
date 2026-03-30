import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ProfileHeroCardProps = {
  email?: string | null;
  mediaLinkUrl?: string | null;
  userName?: string | null;
  onAvatarPress: () => void;
  menu: React.ReactNode;
};

export const ProfileHeroCard = ({
  email,
  mediaLinkUrl,
  userName,
  onAvatarPress,
  menu,
}: ProfileHeroCardProps) => (
  <View style={styles.card}>
    <TouchableOpacity style={styles.avatarWrap} onPress={onAvatarPress}>
      {mediaLinkUrl ? (
        <Image source={{ uri: mediaLinkUrl }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.avatarPlaceholder]}>
          <Text style={styles.avatarPlaceholderText}>{userName?.[0] ?? "?"}</Text>
        </View>
      )}
      <View style={styles.cameraBadge}>
        <Ionicons name="camera" size={14} color="#FFFFFF" />
      </View>
    </TouchableOpacity>

    <Text style={styles.name}>{userName ?? "Khach"}</Text>
    <Text style={styles.email}>{email ?? "Ban chua dang nhap"}</Text>

    {menu}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  avatarWrap: {
    alignSelf: "center",
    width: 92,
    height: 92,
    marginBottom: 12,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
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
  cameraBadge: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  name: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
  },
  email: {
    textAlign: "center",
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 16,
  },
});
