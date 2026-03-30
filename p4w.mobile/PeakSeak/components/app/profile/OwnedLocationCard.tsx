import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { type OwnedLocation } from "@/services/api";

import { normalizeLocationStatusLabel } from "./profileUtils";

type OwnedLocationCardProps = {
  actionLabel?: string;
  location: OwnedLocation;
  onActionPress?: (location: OwnedLocation) => void;
  showId?: boolean;
  showStatusCode?: boolean;
};

export const OwnedLocationCard = ({
  actionLabel,
  location,
  onActionPress,
  showId = false,
  showStatusCode = false,
}: OwnedLocationCardProps) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>{location.locationName}</Text>
        {showId ? <Text style={styles.id}>ID: {location.id}</Text> : null}
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{normalizeLocationStatusLabel(location.statusName)}</Text>
      </View>
    </View>

    <View style={styles.metaBlock}>
      <Text style={styles.metaLabel}>Dia chi</Text>
      <Text style={styles.address}>{location.address}</Text>
    </View>

    {showStatusCode ? (
      <View style={styles.metaBlock}>
        <Text style={styles.metaLabel}>Ma trang thai</Text>
        <Text style={styles.metaValue}>{location.status}</Text>
      </View>
    ) : null}

    {actionLabel && onActionPress ? (
      <Pressable style={styles.actionButton} onPress={() => onActionPress(location)}>
        <Text style={styles.actionButtonText}>{actionLabel}</Text>
      </Pressable>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 16,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  titleWrap: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },
  id: {
    fontSize: 11,
    color: "#94A3B8",
  },
  badge: {
    borderRadius: 999,
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#166534",
  },
  metaBlock: {
    gap: 4,
  },
  metaLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
  },
  address: {
    fontSize: 14,
    lineHeight: 20,
    color: "#334155",
  },
  metaValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#475569",
  },
  actionButton: {
    alignSelf: "flex-start",
    borderRadius: 12,
    backgroundColor: "#5B4ED6",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
});
