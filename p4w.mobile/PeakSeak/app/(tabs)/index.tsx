import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Palette } from '@/components/app/palette';
import { PlaceCard } from '@/components/app/PlaceCard';
import { SearchInput } from '@/components/app/SearchInput';
import { SectionHeader } from '@/components/app/SectionHeader';
import { StatCard } from '@/components/app/StatCard';
import {  useRouter } from 'expo-router';
import { TagPill } from '@/components/app/TagPill';

const stats = [
  { label: 'Địa điểm gần bạn', value: '24' },
  { label: 'Quán yêu thích', value: '08' },
  { label: 'Đánh giá mới', value: '128' },
];

const featuredPlaces = [
  {
    title: 'Lumen Workspace',
    area: 'Quán 1, TP.HCM',
    price: 'Từ 45.000đ/giờ',
    rating: 4.8,
    imageUrl: 'https://picsum.photos/seed/peakseek1/600/400',
    tags: ['Yên tĩnh', 'Ở cầm', 'Wifi mạnh'],
  },
  {
    title: 'The Nest Cafe',
    area: 'Quán 3, TP.HCM',
    price: 'Từ 35.000đ/lý',
    rating: 4.6,
    imageUrl: 'https://picsum.photos/seed/peakseek2/600/400',
    tags: ['Cà phê', 'Có nhạc nhẹ'],
  },
  {
    title: 'Atlas Study Hub',
    area: 'Bình Thạnh, TP.HCM',
    price: 'Từ 60.000đ/giờ',
    rating: 4.7,
    imageUrl: 'https://picsum.photos/seed/peakseek3/600/400',
    tags: ['Yên tĩnh', 'Giờ mở cửa muộn'],
  },
];
const categories = ['Tat ca', 'Coworking', 'Thu vien', 'Ca phe', 'Ngoai troi'];

const nearbyPlaces = [
  {
    title: 'Mono Desk',
    area: 'Quán 10, TP.HCM',
    price: 'Từ 50.000đ/giờ',
    rating: 4.5,
    imageUrl: 'https://picsum.photos/seed/peakseek4/600/400',
    tags: ['Phòng họp', 'Máy chiếu'],
  },
  {
    title: 'Fika Corner',
    area: 'Phú Nhuận, TP.HCM',
    price: 'Từ 40.000đ/lý',
    rating: 4.4,
    imageUrl: 'https://picsum.photos/seed/peakseek5/600/400',
    tags: ['Cà phê', 'Sôi động'],
  },
];

export default function HomeScreen() {
  const user = {
    name: 'Vũ',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
  };
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* HERO ROW với greeting + avatar */}
        <View style={styles.heroRow}>
          <View style={styles.heroText}>
            <Text style={styles.greeting}>Xin chào, {user.name}</Text>
            <Text style={styles.subGreeting}>Hôm nay bạn muốn học ở đâu?</Text>
          </View>

          <Pressable
            onPress={() => {
router.push("/(tabs)/profile");
            }}
            style={styles.avatarBtn}
            hitSlop={10}
          >
            {user.avatarUrl ? (
              <Image source={{ uri: user.avatarUrl }} style={styles.avatarImg} />
            ) : (
              <Ionicons name="person" size={20} color={Palette.text} />
            )}
          </Pressable>
        </View>

        <SearchInput placeholder="Tìm kiếm quán cà phê, thư viện, coworking..." />
            <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.categoryRow}>
                      {categories.map((category) => (
                        <TagPill key={category} label={category} />
                      ))}
                    </ScrollView>
        

        <View style={styles.section}>
          <SectionHeader title="Địa điểm yêu thích" actionLabel="Xem tất cả" onPressAction={()=> router.push('/(tabs)/explore')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {featuredPlaces.map((place) => (
              <View key={place.title} style={styles.featuredItem}>
                <PlaceCard {...place} onPressCard={()=> router.push('/location/location-info')}/>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Gần đây" />
          <View style={styles.verticalList}>
            {nearbyPlaces.map((place) => (
              <PlaceCard key={place.title} {...place} layout="horizontal" onPressCard={() => router.push('/location/location-info')} />
            ))}
          </View>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  heroText: {
    flex: 1,
    gap: 6,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
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
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImg: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  section: {
    gap: 12,
  },
  horizontalList: {
    gap: 14,
  },
  featuredItem: {
    width: 260,
  },
  verticalList: {
    gap: 12,
  },
});
