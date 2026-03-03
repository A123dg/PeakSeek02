import React, { useCallback, useMemo, useRef } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Palette } from '@/components/app/palette';
import { ReportBottomSheet } from '@/components/app/ReportBottomSheet';
import { useReport } from '@/hooks/useReport';
import {
  LocationReviewBottomSheet,
  type LocationReviewBottomSheetRef,
} from '@/components/app/LocationReviewBottomSheet';

const reviews = [
  {
    id: '1',
    title: 'Lan Anh 2 - truyền trade',
    stars: 5,
    time: '1 giờ trước',
    text: 'Không gian yên tĩnh, wifi ổn định, vệ sinh tốt.',
  },
  {
    id: '2',
    title: 'Minh Trí 1 tiểu thuốc',
    stars: 4,
    time: '3 ngày trước',
    text: 'Vị trí dễ tìm, chỗ ngồi thoải mái, phục vụ nhanh.',
  },
  {
    id: '3',
    title: 'Ngọc Vỹ 6 - truyền thuốc',
    stars: 3,
    time: '5 ngày trước',
    text: 'Không gian ổn, giờ cao điểm hơi đông một chút.',
  },
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const LocationInfo = () => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const { reportModalRef, openReportSheet, closeReportSheet } = useReport();

  const reviewModalRef = useRef<LocationReviewBottomSheetRef>(null);
  const openReviewSheet = useCallback(() => {
    reviewModalRef.current?.present();
  }, []);
  const closeReviewSheet = useCallback(() => {
    reviewModalRef.current?.dismiss();
  }, []);

  const reportSnapPoints = useMemo(() => ['55%'], []);
  const reviewSnapPoints = useMemo(() => ['72%'], []);
  const contentWidth = Math.min(width - 24, 460);
  const imageHeight = clamp(contentWidth * 0.58, 170, 260);
  const titleSize = clamp(contentWidth * 0.072, 20, 28);
  const textSize = clamp(contentWidth * 0.038, 13, 16);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.screen}
          contentContainerStyle={[styles.container, { paddingHorizontal: clamp((width - contentWidth) / 2, 12, 20) }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.mapBlock, { height: imageHeight }]}>
            <View pointerEvents="none" style={styles.mapOverlay} />
            <View style={styles.topIconRow}>
              <View style={styles.iconButton}>
                <Ionicons name="chevron-back" size={20} color="#ffffff" onPress={() => router.back()} />
              </View>
              <View style={styles.rightActions}>
                <View style={styles.iconButton}>
                  <Ionicons name="heart-outline" size={18} color="#ffffff" />
                </View>
                <Pressable style={styles.iconButton} onPress={openReportSheet}>
                  <MaterialCommunityIcons name="flag-variant-outline" size={22} color="#f5e7e7" />
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.titleRow}>
            <Text style={[styles.title, { fontSize: titleSize }]}>WorkHub District 1</Text>
            <View style={styles.hoursBadge}>
              <Text style={styles.hoursText}>Mở 08:00 - Đóng 22:00</Text>
            </View>
          </View>
          <Text style={[styles.category, { fontSize: textSize - 1 }]}>Coworking</Text>
          <Text style={[styles.meta, { fontSize: textSize - 1 }]}>12 Le Loi, Q1, TP.HCM</Text>
          <Text style={[styles.desc, { fontSize: textSize, lineHeight: textSize * 1.45 }]}>
            Không gian yên tĩnh, internet ổn định, nhiều chỗ ngồi, bàn ghế thoải mái cho học tập và làm việc nhóm.
          </Text>

          <View style={styles.ratingCard}>
            <Text style={styles.ratingValue}>4.8</Text>
            <View style={styles.ratingRight}>
              <View style={styles.starRow}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <MaterialIcons key={idx} name="star" size={16} color="#f5a146" />
                ))}
              </View>
              <Text style={styles.ratingMeta}>320 đánh giá - cập nhật lần cuối 18:00 - 22:00</Text>
            </View>
          </View>

          <View style={styles.reviewHeader}>
            <Text style={styles.reviewTitle}>Đánh giá</Text>
            <Pressable onPress={openReviewSheet}>
              <Text style={styles.verify}>Viết đánh giá</Text>
            </Pressable>
          </View>

          <View style={styles.reviewList}>
            {reviews.map((review) => (
              <Pressable key={review.id} style={styles.reviewCard} onPress={() => router.push('/location/location-info/comment')}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{review.title[0]}</Text>
                </View>
                <View style={styles.reviewBody}>
                  <Text style={styles.name}>{review.title}</Text>
                  <View style={styles.metaLine}>
                    <View style={styles.smallStarRow}>
                      {Array.from({ length: review.stars }).map((_, i) => (
                        <MaterialIcons key={i} name="star" size={12} color="#f5a146" />
                      ))}
                    </View>
                    <Text style={styles.time}>{review.time}</Text>
                  </View>
                  <Text style={styles.reviewText}>{review.text}</Text>
                </View>
              </Pressable>
            ))}
          </View>
          <Pressable onPress={() => router.push('/location/location-info/comment')}>
            {/* <Text style={styles.footer}>Xem tất cả</Text> */}
          </Pressable>
        </ScrollView>
      </SafeAreaView>

      <ReportBottomSheet
        ref={reportModalRef}
        snapPoints={reportSnapPoints}
        onCancelPress={closeReportSheet}
        onSubmitPress={closeReportSheet}
      />

      <LocationReviewBottomSheet
        ref={reviewModalRef}
        snapPoints={reviewSnapPoints}
        onCancelPress={closeReviewSheet}
        onSubmitPress={async (payload) => {
          console.log('Review submitted:', payload);
        }}
      />
    </View>
  );
};

export default LocationInfo;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f4f8',
  },
  screen: {
    flex: 1,
    backgroundColor: '#f2f4f8',
  },
  container: {
    paddingTop: 12,
    paddingBottom: 28,
    gap: 10,
  },
  mapBlock: {
    borderRadius: 18,
    backgroundColor: '#b9b4ad',
    overflow: 'hidden',
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  topIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.24)',
  },
  titleRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    flex: 1,
    fontWeight: '700',
    color: '#111827',
  },
  hoursBadge: {
    borderRadius: 999,
    backgroundColor: '#dcfce7',
    borderWidth: 1,
    borderColor: '#86efac',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  hoursText: {
    fontSize: 11,
    color: '#166534',
    fontWeight: '700',
  },
  category: {
    color: '#4b5563',
    marginTop: -2,
  },
  meta: {
    color: '#374151',
    fontWeight: '500',
    marginTop: 6,
  },
  desc: {
    color: '#4b5563',
    marginTop: 2,
  },
  ratingCard: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 14,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  ratingValue: {
    fontSize: 34,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 38,
  },
  ratingRight: {
    flex: 1,
    gap: 4,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingMeta: {
    fontSize: 12,
    color: '#6b7280',
  },
  reviewHeader: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  verify: {
    fontSize: 12,
    color: '#1d4ed8',
    backgroundColor: '#e0e7ff',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    overflow: 'hidden',
    fontWeight: '600',
  },
  reviewList: {
    gap: 10,
  },
  reviewCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    padding: 12,
    flexDirection: 'row',
    gap: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#dbe3ee',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  reviewBody: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  metaLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  smallStarRow: {
    flexDirection: 'row',
    gap: 1,
  },
  time: {
    fontSize: 11,
    color: '#6b7280',
  },
  reviewText: {
    fontSize: 12,
    color: '#4b5563',
    lineHeight: 17,
  },
  footer: {
    fontSize: 16,
    color: Palette.primary,
    marginTop: 2,
    textAlign: 'center',
  },
});
