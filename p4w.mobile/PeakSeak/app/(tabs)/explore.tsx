import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Palette } from '@/components/app/palette';
import { PlaceCard } from '@/components/app/PlaceCard';
import { SearchInput } from '@/components/app/SearchInput';
import { SectionHeader } from '@/components/app/SectionHeader';
import { TagPill } from '@/components/app/TagPill';

const categories = ['Tat ca', 'Coworking', 'Thu vien', 'Ca phe', 'Ngoai troi'];

const trendingPlaces = [
  {
    title: 'North Star Hub',
    area: 'Quan 2, TP.HCM',
    price: 'Tu 55.000d/gio',
    rating: 4.9,
    imageUrl: 'https://picsum.photos/seed/peakseek6/600/400',
    tags: ['Phong hop', 'Thuc uong'],
  },
  {
    title: 'Baker Street',
    area: 'Quan 7, TP.HCM',
    price: 'Tu 42.000d/ly',
    rating: 4.6,
    imageUrl: 'https://picsum.photos/seed/peakseek7/600/400',
    tags: ['Ca phe', 'View dep'],
  },
];

const allPlaces = [
  {
    title: 'CoLab District',
    area: 'Quan 1, TP.HCM',
    price: 'Tu 70.000d/gio',
    rating: 4.8,
    imageUrl: 'https://picsum.photos/seed/peakseek8/600/400',
    tags: ['Coworking', '24/7'],
  },
  {
    title: 'Green Study Loft',
    area: 'Thu Duc, TP.HCM',
    price: 'Tu 30.000d/ly',
    rating: 4.4,
    imageUrl: 'https://picsum.photos/seed/peakseek9/600/400',
    tags: ['Thu vien', 'Yen tinh'],
  },
  {
    title: 'Riverside Cafe',
    area: 'Quan 4, TP.HCM',
    price: 'Tu 45.000d/ly',
    rating: 4.5,
    imageUrl: 'https://picsum.photos/seed/peakseek10/600/400',
    tags: ['Song dong', 'View song'],
  },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Khám phá</Text>
          <Text style={styles.subtitle}>Lọc theo nhu cầu học tập của bạn</Text>
        </View>

        <SearchInput placeholder="Tìm theo tên địa điểm, loại hình..." />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}>
          {categories.map((category) => (
            <TagPill key={category} label={category} />
          ))}
        </ScrollView>

        <View style={styles.section}>
          <SectionHeader title="Đang thịnh hành" actionLabel="Cập nhật" />
          <View style={styles.list}>
            {trendingPlaces.map((place) => (
              <PlaceCard key={place.title} {...place} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Tất cả địa điểm" />
          <View style={styles.list}>
            {allPlaces.map((place) => (
              <PlaceCard key={place.title} {...place} layout="horizontal" />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  header: {
    gap: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Palette.text,
  },
  subtitle: {
    fontSize: 14,
    color: Palette.subtext,
  },
  categoryRow: {
    gap: 8,
  },
  section: {
    gap: 12,
  },
  list: {
    gap: 12,
  },
});
