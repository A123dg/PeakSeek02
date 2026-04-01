import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, Pressable, ActivityIndicator, RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Palette } from "@/components/app/palette";
import { PlaceCard } from "@/components/app/PlaceCard";
import { SearchInput } from "@/components/app/SearchInput";
import { SectionHeader } from "@/components/app/SectionHeader";
import { useRouter } from "expo-router";
import { TagPill } from "@/components/app/TagPill";
import { getLocationsApi, type LocationCard } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

const categories = ["Tất cả", "Coworking", "Thư viện", "Cà phê", "Ngoài trời"];

const getTypeLabel = (type: number) => {
  switch (type) {
    case 1:
      return "Coworking";
    case 2:
      return "Thư viện";
    case 3:
      return "Cà phê";
    default:
      return "Địa điểm";
  }
};

const toPlaceCardProps = (location: LocationCard) => ({
  title: location.locationName,
  area: location.address,
  price: location.openingHours && location.closingHours ? `${location.openingHours} - ${location.closingHours}` : "Đang cập nhật",
  rating: location.averageRating || 0,
  imageUrl: location.mediaLinkUrls?.[0] || `https://picsum.photos/seed/${location.id}/600/400`,
  tags: [getTypeLabel(location.type), `${location.reviewCount} đánh giá`],
});

export default function HomeScreen() {
  const router = useRouter();
  const { profile } = useAuth();
  const [locations, setLocations] = useState<LocationCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentCategory, setCurrentCategory] = useState(0);
  const [recallList, setRecallList] = useState<number>(0);
  const loadLocations = useCallback(async () => {
    try {
      const response = await getLocationsApi(searchValue, currentCategory);
      setLocations(response.data);
    } finally {
      setIsLoading(false);
    }
  }, [searchValue, currentCategory]);

  useEffect(() => {
    void loadLocations();
  }, [recallList]);

  const handleCategoryPress = (category: number) => {
    console.log("category", category);
    setCurrentCategory(category);
    setRecallList(new Date().getTime());
  };

  const handleSearchChange = (text: string) => {
    setSearchValue(text);
    debounceSearch(text);
  };

  const debounceRef = useRef<any>(null);

  const debounceSearch = (value: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setRecallList(Date.now());
    }, 500);
  };

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await loadLocations();
    } finally {
      setIsRefreshing(false);
    }
  }, [loadLocations]);

  const featuredPlaces = useMemo(() => locations.slice(0, 3), [locations]);
  const recentLocation = useMemo(() => {
    if (!profile?.recentLocation) {
      return null;
    }

    const matchedLocation = locations.find((location) => location.id === profile.recentLocation?.id);

    return {
      id: profile.recentLocation.id,
      title: profile.recentLocation.locationName || "Địa điểm gần đây",
      area: profile.recentLocation.address || "Đang cập nhật địa chỉ",
      price: "Gần đây",
      rating: matchedLocation?.averageRating || 0,
      imageUrl:
        profile.recentLocation.mediaLinkUrls?.[0] ||
        `https://picsum.photos/seed/recent-${profile.recentLocation.id}/600/400`,
      tags: ["Gần đây"],
    };
  }, [locations, profile?.recentLocation]);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => void handleRefresh()} />}
      >
        <View style={styles.heroRow}>
          <View style={styles.heroText}>
            <Text style={styles.greeting}>Xin chào, {profile?.userName ?? "bạn"}</Text>
            <Text style={styles.subGreeting}>Hôm nay bạn muốn học ở đâu?</Text>
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

        <SearchInput value={searchValue} onChangeText={handleSearchChange} placeholder="Tìm kiếm quán cà phê, thư viện, coworking..." />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
          {categories.map((category, index) => (
            <Pressable key={category} onPress={() => handleCategoryPress(index)}>
              <TagPill key={category} label={category} activeTab={currentCategory === index} />
            </Pressable>
          ))}
        </ScrollView>

        {isLoading ? (
          <ActivityIndicator color={Palette.primary} />
        ) : (
          <>
            {recentLocation && (
              <View style={styles.section}>
                <SectionHeader title="Gần đây" />
                <View style={styles.verticalList}>
                  <PlaceCard
                    title={recentLocation.title}
                    area={recentLocation.area}
                    price={recentLocation.price}
                    rating={recentLocation.rating}
                    imageUrl={recentLocation.imageUrl}
                    tags={recentLocation.tags}
                    layout="horizontal"
                    onPressCard={() =>
                      router.push({
                        pathname: "/location/location-info",
                        params: { locationId: recentLocation.id },
                      })
                    }
                  />
                </View>
              </View>
            )}
            {featuredPlaces.length > 0 && (
            <View style={styles.section}>
              <SectionHeader title="Tất cả địa điểm" />
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
            )}
            {locations.length === 0 && (
              <Text style={{ textAlign: "center", color: Palette.subtext, marginTop: 40 }}>Không tìm thấy địa điểm nào phù hợp</Text>
            )}
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

