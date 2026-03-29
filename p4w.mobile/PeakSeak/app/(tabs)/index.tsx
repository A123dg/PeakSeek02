import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Palette } from "@/components/app/palette";
import { PlaceCard } from "@/components/app/PlaceCard";
import { SearchInput } from "@/components/app/SearchInput";
import { SectionHeader } from "@/components/app/SectionHeader";
import { useRouter } from "expo-router";
import { TagPill } from "@/components/app/TagPill";
import { getLocationsApi, type LocationCard } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

const categories = ["Tat ca", "Coworking", "Thu vien", "Ca phe", "Ngoai troi"];

const getTypeLabel = (type: number) => {
  switch (type) {
    case 1:
      return "Coworking";
    case 2:
      return "Thu vien";
    case 3:
      return "Ca phe";
    default:
      return "Dia diem";
  }
};

const toPlaceCardProps = (location: LocationCard) => ({
  title: location.locationName,
  area: location.address,
  price: location.openingHours && location.closingHours ? `${location.openingHours} - ${location.closingHours}` : "Dang cap nhat",
  rating: location.averageRating || 0,
  imageUrl: `https://picsum.photos/seed/${location.id}/600/400`,
  tags: [getTypeLabel(location.type), `${location.reviewCount} danh gia`],
});

export default function HomeScreen() {
  const router = useRouter();
  const { profile } = useAuth();
  const [locations, setLocations] = useState<LocationCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const response = await getLocationsApi();
        setLocations(response.data);
      } finally {
        setIsLoading(false);
      }
    };

    void loadLocations();
  }, []);

  const featuredPlaces = useMemo(() => locations.slice(0, 3), [locations]);
  const nearbyPlaces = useMemo(() => locations.slice(0, 5), [locations]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroRow}>
          <View style={styles.heroText}>
            <Text style={styles.greeting}>Xin chao, {profile?.userName ?? "ban"}</Text>
            <Text style={styles.subGreeting}>Hom nay ban muon hoc o dau?</Text>
          </View>

          <Pressable
            onPress={() => {
              router.push("/(tabs)/profile");
            }}
            style={styles.avatarBtn}
            hitSlop={10}
          >
            {profile?.mediaLinkUrl ? (
              <Image source={{ uri: profile.mediaLinkUrl }} style={styles.avatarImg} />
            ) : (
              <Ionicons name="person" size={20} color={Palette.text} />
            )}
          </Pressable>
        </View>

        <SearchInput placeholder="Tim kiem quan ca phe, thu vien, coworking..." />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
          {categories.map((category) => (
            <TagPill key={category} label={category} />
          ))}
        </ScrollView>

        {isLoading ? (
          <ActivityIndicator color={Palette.primary} />
        ) : (
          <>
            <View style={styles.section}>
              <SectionHeader title="Gan day" />
              <View style={styles.verticalList}>
                {nearbyPlaces.map((place) => (
                  <PlaceCard
                    key={place.id}
                    {...toPlaceCardProps(place)}
                    layout="horizontal"
                    onPressCard={() =>
                      router.push({
                        pathname: "/location/location-info",
                        params: { locationId: place.id },
                      })
                    }
                  />
                ))}
              </View>
            </View>
            <View style={styles.section}>
              <SectionHeader title="Tat ca dia diem" />
              <View style={styles.list}>
                {featuredPlaces.map((place) => (
                  <PlaceCard
                    key={place.id}
                    {...toPlaceCardProps(place)}
                    layout="horizontal"
                    onPressCard={() =>
                      router.push({
                        pathname: "/location/location-info",
                        params: { locationId: place.id },
                      })
                    }
                  />
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const AVATAR_SIZE = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.bg,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    gap: 18,
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  heroText: {
    flex: 1,
    gap: 6,
  },
  list: {
    gap: 12,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    color: Palette.text,
  },
  subGreeting: {
    fontSize: 14,
    color: Palette.subtext,
  },
  categoryRow: {
    gap: 8,
  },
  avatarBtn: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: Palette.card,
    borderWidth: 1,
    borderColor: Palette.border,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImg: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  section: {
    gap: 12,
  },
  verticalList: {
    gap: 12,
  },
});
