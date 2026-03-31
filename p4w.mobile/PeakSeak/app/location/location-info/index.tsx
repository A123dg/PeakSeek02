import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert, Image, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, useWindowDimensions, View, ActivityIndicator } from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Palette } from "@/components/app/palette";
import { ReportBottomSheet } from "@/components/app/ReportBottomSheet";
import { useReport } from "@/hooks/useReport";
import {
  LocationReviewBottomSheet,
  type LocationReviewBottomSheetRef,
} from "@/components/app/LocationReviewBottomSheet";
import { createReportApi, createReviewApi, getLocationDetailApi, type LocationDetail } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

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

const formatTimeAgo = (value: string) => {
  const date = new Date(value).getTime();
  const diffHours = Math.max(1, Math.floor((Date.now() - date) / (1000 * 60 * 60)));
  if (diffHours < 24) return `${diffHours} gio truoc`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} ngay truoc`;
};

export const LocationInfo = () => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const { locationId } = useLocalSearchParams<{ locationId?: string }>();
  const { reportModalRef, openReportSheet, closeReportSheet } = useReport();
  const { isAuthenticated, authorizedRequest } = useAuth();
  const [location, setLocation] = useState<LocationDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const reviewModalRef = useRef<LocationReviewBottomSheetRef>(null);
  const openReviewSheet = useCallback(() => {
    if (!isAuthenticated) {
      Alert.alert("Can dang nhap", "Vui long dang nhap de viet danh gia.");
      router.push("/auth/login/Login");
      return;
    }
    reviewModalRef.current?.present();
  }, [isAuthenticated, router]);
  const closeReviewSheet = useCallback(() => {
    reviewModalRef.current?.dismiss();
  }, []);

  const loadLocation = useCallback(async () => {
    if (!locationId) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await getLocationDetailApi(locationId);
      setLocation(response.data);
    } finally {
      setIsLoading(false);
    }
  }, [locationId]);

  useEffect(() => {
    void loadLocation();
  }, [loadLocation]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await loadLocation();
    } finally {
      setIsRefreshing(false);
    }
  }, [loadLocation]);

  const reportSnapPoints = useMemo(() => ["55%"], []);
  const reviewSnapPoints = useMemo(() => ["72%"], []);
  const contentWidth = Math.min(width - 24, 460);
  const imageHeight = clamp(contentWidth * 0.58, 170, 260);
  const titleSize = clamp(contentWidth * 0.072, 20, 28);
  const textSize = clamp(contentWidth * 0.038, 13, 16);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loaderWrap}>
        <ActivityIndicator color={Palette.primary} />
      </SafeAreaView>
    );
  }

  if (!location) {
    return (
      <SafeAreaView style={styles.loaderWrap}>
        <Text>Khong tim thay dia diem.</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.screen}
          contentContainerStyle={[styles.container, { paddingHorizontal: clamp((width - contentWidth) / 2, 12, 20) }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => void handleRefresh()} />}
        >
          <View style={[styles.mapBlock, { height: imageHeight }]}>
            {location.mediaLinkUrls?.[0] ? (
              <Image source={{ uri: location.mediaLinkUrls[0] }} style={styles.locationImage} />
            ) : null}
            <View pointerEvents="none" style={styles.mapOverlay} />
            <View style={styles.topIconRow}>
              <Pressable style={styles.iconButton} onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={20} color="#ffffff" />
              </Pressable>
              <View style={styles.rightActions}>
                <View style={styles.iconButton}>
                  <Ionicons name="heart-outline" size={18} color="#ffffff" />
                </View>
                <Pressable
                  style={styles.iconButton}
                  onPress={() => {
                    if (!isAuthenticated) {
                      Alert.alert("Can dang nhap", "Vui long dang nhap de gui bao cao.");
                      router.push("/auth/login/Login");
                      return;
                    }
                    openReportSheet();
                  }}
                >
                  <MaterialCommunityIcons name="flag-variant-outline" size={22} color="#f5e7e7" />
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.titleRow}>
            <Text style={[styles.title, { fontSize: titleSize }]}>{location.locationName}</Text>
            <View style={styles.hoursBadge}>
              <Text style={styles.hoursText}>
                {location.openingHours ?? "--:--"} - {location.closingHours ?? "--:--"}
              </Text>
            </View>
          </View>
          <Text style={[styles.category, { fontSize: textSize - 1 }]}>{getTypeLabel(location.type)}</Text>
          <Text style={[styles.meta, { fontSize: textSize - 1 }]}>{location.address}</Text>
          <Text style={[styles.desc, { fontSize: textSize, lineHeight: textSize * 1.45 }]}>
            {location.description || "Dia diem dang duoc cap nhat mo ta."}
          </Text>

          <View style={styles.ratingCard}>
            <Text style={styles.ratingValue}>{location.averageRating.toFixed(1)}</Text>
            <View style={styles.ratingRight}>
              <View style={styles.starRow}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <MaterialIcons key={idx} name="star" size={16} color="#f5a146" />
                ))}
              </View>
              <Text style={styles.ratingMeta}>{location.reviewCount} danh gia</Text>
            </View>
          </View>

          <View style={styles.reviewHeader}>
            <Text style={styles.reviewTitle}>Danh gia</Text>
            <Pressable onPress={openReviewSheet}>
              <Text style={styles.verify}>Viet danh gia</Text>
            </Pressable>
          </View>

          <View style={styles.reviewList}>
            {location.recentReviews.map((review) => (
              <Pressable
                key={review.id}
                style={styles.reviewCard}
                onPress={() =>
                  router.push({
                    pathname: "/location/location-info/comment",
                    params: {
                      reviewId: review.id,
                      reviewUser: review.userName,
                      locationId: location.id,
                      locationName: location.locationName,
                    },
                  })
                }
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{review.userName[0]}</Text>
                </View>
                <View style={styles.reviewBody}>
                  <Text style={styles.name}>{review.userName}</Text>
                  <View style={styles.metaLine}>
                    <View style={styles.smallStarRow}>
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <MaterialIcons key={i} name="star" size={12} color="#f5a146" />
                      ))}
                    </View>
                    <Text style={styles.time}>{formatTimeAgo(review.createdAt)}</Text>
                  </View>
                  <Text style={styles.reviewText}>{review.content}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <ReportBottomSheet
        ref={reportModalRef}
        snapPoints={reportSnapPoints}
        onCancelPress={closeReportSheet}
        onSubmitPress={async (payload) => {
          try {
            await authorizedRequest((token) =>
              createReportApi(
                {
                  reason: payload.note ? `${payload.reason}: ${payload.note}` : payload.reason,
                  targetType: "Location",
                  targetId: location.id,
                },
                token
              )
            );
            closeReportSheet();
            Alert.alert("Thanh cong", "Bao cao da duoc gui.");
          } catch (error) {
            Alert.alert("That bai", error instanceof Error ? error.message : "Khong gui duoc bao cao.");
          }
        }}
      />

      <LocationReviewBottomSheet
        ref={reviewModalRef}
        snapPoints={reviewSnapPoints}
        onCancelPress={closeReviewSheet}
        onSubmitPress={async (payload) => {
          try {
            await authorizedRequest((token) =>
              createReviewApi(
                {
                  locationId: location.id,
                  rating: payload.rating,
                  content: payload.content,
                },
                token
              )
            );

            await loadLocation();
          } catch (error) {
            Alert.alert("That bai", error instanceof Error ? error.message : "Khong gui duoc danh gia.");
            throw error;
          }
        }}
      />
    </View>
  );
};

export default LocationInfo;

const styles = StyleSheet.create({
  loaderWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f4f8",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f2f4f8",
  },
  screen: {
    flex: 1,
    backgroundColor: "#f2f4f8",
  },
  container: {
    paddingTop: 12,
    paddingBottom: 28,
    gap: 10,
  },
  mapBlock: {
    borderRadius: 18,
    backgroundColor: "#b9b4ad",
    overflow: "hidden",
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.08)",
  },
  locationImage: {
    ...StyleSheet.absoluteFillObject,
  },
  topIconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.24)",
  },
  titleRow: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    flex: 1,
    fontWeight: "700",
    color: "#111827",
  },
  hoursBadge: {
    borderRadius: 999,
    backgroundColor: "#dcfce7",
    borderWidth: 1,
    borderColor: "#86efac",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  hoursText: {
    fontSize: 11,
    color: "#166534",
    fontWeight: "700",
  },
  category: {
    color: "#4b5563",
    marginTop: -2,
  },
  meta: {
    color: "#374151",
    fontWeight: "500",
    marginTop: 6,
  },
  desc: {
    color: "#4b5563",
    marginTop: 2,
  },
  ratingCard: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  ratingValue: {
    fontSize: 34,
    fontWeight: "700",
    color: "#111827",
    lineHeight: 38,
  },
  ratingRight: {
    flex: 1,
    gap: 4,
  },
  starRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  ratingMeta: {
    fontSize: 12,
    color: "#6b7280",
  },
  reviewHeader: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  verify: {
    fontSize: 12,
    color: "#1d4ed8",
    backgroundColor: "#e0e7ff",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    overflow: "hidden",
    fontWeight: "600",
  },
  reviewList: {
    gap: 10,
  },
  reviewCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
    padding: 12,
    flexDirection: "row",
    gap: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#dbe3ee",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  avatarText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
  },
  reviewBody: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  metaLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  smallStarRow: {
    flexDirection: "row",
    gap: 1,
  },
  time: {
    fontSize: 11,
    color: "#6b7280",
  },
  reviewText: {
    fontSize: 12,
    color: "#4b5563",
    lineHeight: 17,
  },
});
