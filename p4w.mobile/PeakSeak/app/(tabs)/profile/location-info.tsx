import React, { useEffect, useMemo } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { EmptyOwnedLocations } from "@/components/app/profile/EmptyOwnedLocations";
import { OwnedLocationCard } from "@/components/app/profile/OwnedLocationCard";
import { OwnedLocationsScreenHeader } from "@/components/app/profile/OwnedLocationsScreenHeader";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfileLocationInfoScreen() {
  const { isAuthenticated, profile, refreshProfile } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      void refreshProfile();
    }
  }, [isAuthenticated, refreshProfile]);

  const ownedLocations = useMemo(() => profile?.ownedLocations ?? [], [profile?.ownedLocations]);

  return (
    <SafeAreaView style={styles.safe}>
      <OwnedLocationsScreenHeader
        title="Dia diem cua ban"
        subtitle="Danh sach dia diem dang gan voi tai khoan hien tai"
        onAddPress={() => router.push("/(tabs)/profile/location-register")}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Ionicons name="business-outline" size={18} color="#166534" />
          </View>
          <View style={styles.summaryTextWrap}>
            <Text style={styles.summaryTitle}>{ownedLocations.length} dia diem da so huu</Text>
            <Text style={styles.summaryDescription}>
              Du lieu duoc bind truc tiep tu `ownedLocations` trong API profile.
            </Text>
          </View>
        </View>

        {ownedLocations.length > 0 ? (
          ownedLocations.map((location) => (
            <OwnedLocationCard
              key={location.id}
              actionLabel="Cap nhat"
              location={location}
              onActionPress={(selectedLocation) =>
                router.push({
                  pathname: "/(tabs)/profile/location-update",
                  params: {
                    id: selectedLocation.id,
                    locationName: selectedLocation.locationName,
                    address: selectedLocation.address,
                    status: `${selectedLocation.status}`,
                    statusName: selectedLocation.statusName,
                  },
                })
              }
              showId
              showStatusCode
            />
          ))
        ) : (
          <EmptyOwnedLocations description="Khi API profile tra ve `ownedLocations`, danh sach se hien thi o day." />
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
});
