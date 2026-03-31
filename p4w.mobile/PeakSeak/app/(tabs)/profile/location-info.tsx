import React, { useCallback, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { EmptyOwnedLocations } from "@/components/app/profile/EmptyOwnedLocations";
import { OwnedLocationCard } from "@/components/app/profile/OwnedLocationCard";
import { OwnedLocationsScreenHeader } from "@/components/app/profile/OwnedLocationsScreenHeader";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfileLocationInfoScreen() {
  const { profile, refreshProfile } = useAuth();
  const ownedLocations = profile?.ownedLocations ?? [];
  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleUpdatePress = (location: (typeof ownedLocations)[number]) => {
    router.push({
      pathname: "/(tabs)/profile/location-update",
      params: {
        id: location.id,
        locationName: location.locationName,
        address: location.address,
        addressLink: location.addressLink ?? undefined,
        mediaLinkUrls: JSON.stringify(location.mediaLinkUrls ?? []),
        status: String(location.status),
        statusName: location.statusName,
      },
    });
  };

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refreshProfile();
    } finally {
      setIsRefreshing(false);
    }
  }, [refreshProfile]);

  return (
    <SafeAreaView style={styles.safe}>
      <OwnedLocationsScreenHeader
        title="Dia diem cua ban"
        subtitle="Danh sach dia diem dang gan voi tai khoan hien tai"
        onAddPress={() => router.push("/(tabs)/profile/location-register")}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => void handleRefresh()} />}
      >
        {/* <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Ionicons name="business-outline" size={18} color="#166534" />
          </View>
          <View style={styles.summaryTextWrap}>
            <Text style={styles.summaryTitle}>
              {ownedLocations.length > 0 ? `${ownedLocations.length} dia diem dang so huu` : "Dang ky dia diem moi"}
            </Text>
            <Text style={styles.summaryDescription}>
              {ownedLocations.length > 0
                ? "Danh sach ben duoi duoc lay tu thong tin profile cua tai khoan hien tai."
                : "Ban co the tao dia diem moi bang nut them o phia tren."}
            </Text>
          </View>
        </View> */}

        {ownedLocations.length > 0 ? (
          <View style={styles.list}>
            {ownedLocations.map((location) => (
              <OwnedLocationCard
                key={location.id}
                actionLabel="Cap nhat"
                location={location}
                onActionPress={handleUpdatePress}
              />
            ))}
          </View>
        ) : (
          <EmptyOwnedLocations description="Ban co the tao dia diem moi bang nut them o phia tren." />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F4FBF7",
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  summaryCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCFCE7",
    padding: 14,
  },
  summaryIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DCFCE7",
  },
  summaryTextWrap: {
    flex: 1,
    gap: 2,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },
  summaryDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: "#64748B",
  },
  list: {
    gap: 12,
  },
});
