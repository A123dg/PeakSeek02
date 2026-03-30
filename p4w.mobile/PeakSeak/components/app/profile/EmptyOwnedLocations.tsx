import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type EmptyOwnedLocationsProps = {
  title?: string;
  description: string;
};

export const EmptyOwnedLocations = ({
  title = "Chua co dia diem nao",
  description,
}: EmptyOwnedLocationsProps) => (
  <View style={styles.card}>
    <Ionicons name="location-outline" size={24} color="#64748B" />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#CBD5E1",
    backgroundColor: "#F8FAFC",
    padding: 24,
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },
  description: {
    textAlign: "center",
    fontSize: 13,
    lineHeight: 20,
    color: "#64748B",
  },
});
