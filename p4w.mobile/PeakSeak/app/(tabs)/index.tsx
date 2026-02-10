import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Palette } from '@/components/app/palette';
import { PlaceCard } from '@/components/app/PlaceCard';
import { SearchInput } from '@/components/app/SearchInput';
import { SectionHeader } from '@/components/app/SectionHeader';
import { StatCard } from '@/components/app/StatCard';

const stats = [
  { label: 'Dia diem gan ban', value: '24' },
  { label: 'Quan yeu thich', value: '08' },
  { label: 'Danh gia moi', value: '128' },
];

const featuredPlaces = [
  {
    title: 'Lumen Workspace',
    area: 'Quan 1, TP.HCM',
    price: 'Tu 45.000d/gio',
    rating: 4.8,
    imageUrl: 'https://picsum.photos/seed/peakseek1/600/400',
    tags: ['Yen tinh', 'O cam', 'Wifi manh'],
  },
  {
    title: 'The Nest Cafe',
    area: 'Quan 3, TP.HCM',
    price: 'Tu 35.000d/ly',
    rating: 4.6,
    imageUrl: 'https://picsum.photos/seed/peakseek2/600/400',
    tags: ['Ca phe', 'Co nhac nhe'],
  },
  {
    title: 'Atlas Study Hub',
    area: 'Binh Thanh, TP.HCM',
    price: 'Tu 60.000d/gio',
    rating: 4.7,
    imageUrl: 'https://picsum.photos/seed/peakseek3/600/400',
    tags: ['Yen tinh', 'Gio mo cua muon'],
  },
];

const nearbyPlaces = [
  {
    title: 'Mono Desk',
    area: 'Quan 10, TP.HCM',
    price: 'Tu 50.000d/gio',
    rating: 4.5,
    imageUrl: 'https://picsum.photos/seed/peakseek4/600/400',
    tags: ['Phong hop', 'May chieu'],
  },
  {
    title: 'Fika Corner',
    area: 'Phu Nhuan, TP.HCM',
    price: 'Tu 40.000d/ly',
    rating: 4.4,
    imageUrl: 'https://picsum.photos/seed/peakseek5/600/400',
    tags: ['Ca phe', 'Song dong'],
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.greeting}>Xin chào, Minh</Text>
          <Text style={styles.subGreeting}>Hôm nay bạn muốn học ở đâu?</Text>
        </View>

        <SearchInput placeholder="Tìm kiếm quán cà phê, thư viện, coworking..." />

        <View style={styles.statsRow}>
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </View>

        <View style={styles.section}>
          <SectionHeader title="Nổi bật gần bạn" actionLabel="Xem tất cả" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {featuredPlaces.map((place) => (
              <View key={place.title} style={styles.featuredItem}>
                <PlaceCard {...place} />
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Gần đây" />
          <View style={styles.verticalList}>
            {nearbyPlaces.map((place) => (
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
  hero: {
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
