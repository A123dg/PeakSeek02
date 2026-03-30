import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type OwnedLocationsScreenHeaderProps = {
  onAddPress: () => void;
  subtitle: string;
  title: string;
};

export const OwnedLocationsScreenHeader = ({
  onAddPress,
  subtitle,
  title,
}: OwnedLocationsScreenHeaderProps) => (
  <View style={styles.header}>
    <Pressable style={styles.backButton} onPress={() => router.back()}>
      <Ionicons name="arrow-back" size={18} color="#334155" />
    </Pressable>
    <View style={styles.copy}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
    <Pressable style={styles.addButton} onPress={onAddPress}>
      <Ionicons name="add" size={18} color="#FFFFFF" />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
  },
  backButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: "#64748B",
  },
  addButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#16A34A",
  },
});
