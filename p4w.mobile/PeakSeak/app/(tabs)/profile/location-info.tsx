import React from 'react';
import { ImageBackground, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ProfileLocationInfoScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={18} color="#334155" />
        </Pressable>

        <View style={styles.card}>
          <ImageBackground
            source={{ uri: 'https://picsum.photos/seed/brew-haven/700/380' }}
            imageStyle={styles.image}
            style={styles.imageWrap}
          >
            <View style={styles.starsBadge}>
              <Text style={styles.starsBadgeText}>4.8</Text>
            </View>
            <View style={styles.imageBottom}>
              <Text style={styles.locationTitle}>Brew Haven</Text>
              <Text style={styles.locationMeta}>Thông tin mô tả</Text>
            </View>
          </ImageBackground>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Giờ mở cửa</Text>
            <Text style={styles.value}>08:00 - 22:00</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Địa chỉ</Text>
            <View style={styles.addressRow}>
              <Text style={[styles.value, { flex: 1 }]}>12 Nguyen Hiep, District GoVap</Text>
              <View style={styles.verifyBadge}>
                <Text style={styles.verifyText}>Verify 100%</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.rateValue}>4.8</Text>
            <View>
              <Text style={styles.rateStars}>★★★★★</Text>
              <Text style={styles.rateMeta}>320+ reviews</Text>
            </View>
          </View>

          <Pressable style={styles.updateButton} onPress={() => router.push('/(tabs)/profile/location-update')}>
            <Text style={styles.updateText}>Cập nhật</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f2f2f3' },
  container: { flex: 1, padding: 12 },
  backButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  card: {
    borderRadius: 12,
    backgroundColor: '#ffffff',
    padding: 10,
    gap: 10,
  },
  imageWrap: {
    height: 160,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'space-between',
    padding: 8,
  },
  image: { borderRadius: 10 },
  starsBadge: {
    alignSelf: 'flex-end',
    borderRadius: 999,
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  starsBadgeText: { fontSize: 10, fontWeight: '700', color: '#111827' },
  imageBottom: { gap: 2 },
  locationTitle: { color: '#ffffff', fontSize: 18, fontWeight: '800' },
  locationMeta: { color: '#e5e7eb', fontSize: 11 },
  infoBox: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ececf0',
    backgroundColor: '#f8f8fa',
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: { fontSize: 10, color: '#6b7280', width: 64 },
  value: { fontSize: 11, color: '#374151', fontWeight: '500' },
  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  verifyBadge: {
    borderRadius: 999,
    backgroundColor: '#ede9fe',
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  verifyText: { fontSize: 9, color: '#5b21b6', fontWeight: '700' },
  rateValue: { fontSize: 36, fontWeight: '800', color: '#111827', lineHeight: 38, marginRight: 10 },
  rateStars: { color: '#f59e0b', fontSize: 12, letterSpacing: 1 },
  rateMeta: { color: '#6b7280', fontSize: 10 },
  updateButton: {
    borderRadius: 8,
    backgroundColor: '#6956d5',
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  updateText: { color: '#ffffff', fontWeight: '700', fontSize: 13 },
});

