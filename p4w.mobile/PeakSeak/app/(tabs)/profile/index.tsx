import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { GoSitemapButton } from '@/components/app/GoSiteMapButton';

type Profile = {
  name: string;
  email: string;
  address: string;
  avatarUrl: string;
};

const fakeProfile: Profile = {
  name: 'Vu',
  email: 'vu.ptit@gmail.com',
  address: '21 Jump Street, New York, USA',
  avatarUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuuRUuY0U7_ltPWcdV4_q_axo03bc4LMwf3w&s',
};

export const ProfileScreen = () => {
  const onPressPersonalInfo = () =>
    Alert.alert('Thong tin ca nhan', 'Open Personal Info (fake)');

  const onPressAddress = () => router.push('/(tabs)/profile/location-info');

  const onPressLogout = () => {
    Alert.alert('Dang xuat', 'Ban co chac muon dang xuat khong?', [
      { text: 'Huy', style: 'cancel' },
      {
        text: 'Dang xuat',
        style: 'destructive',
        onPress: () => router.push('/(tabs)'),
      },
    ]);
  };
  const [avatar, setAvatar] = useState<string | null>(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Cho phep ung dung truy cap anh cua ban');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setAvatar(uri);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: avatar || fakeProfile.avatarUrl }} style={styles.avatar} />
            <TouchableOpacity style={styles.cameraBadge} onPress={pickImage}>
              <Ionicons name="camera" size={14} color="white" />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>{fakeProfile.name}</Text>
          <Text style={styles.email}>{fakeProfile.email}</Text>

          <View style={styles.group}>
            <MenuItem icon="person-outline" title="Thong tin ca nhan" onPress={onPressPersonalInfo} />
            <Divider />
            <MenuItem icon="location-outline" title="Dia diem cua ban" onPress={onPressAddress} />
            <Divider />
            <MenuItem icon="log-out-outline" title="Dang xuat" danger onPress={onPressLogout} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <GoSitemapButton />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const MenuItem = ({
  icon,
  title,
  onPress,
  danger,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
  danger?: boolean;
}) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.itemIcon}>
      <Ionicons name={icon} size={18} color={danger ? '#EF4444' : '#111827'} />
    </View>
    <Text style={[styles.itemTitle, danger && { color: '#EF4444' }]}>{title}</Text>
    <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
  </TouchableOpacity>
);

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F4FBF7',
  },
  content: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 22,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  avatarWrap: {
    alignSelf: 'center',
    width: 92,
    height: 92,
    marginBottom: 12,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
  },
  cameraBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  name: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
  },
  email: {
    textAlign: 'center',
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 16,
  },
  group: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  itemIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F2F4',
    marginLeft: 64,
  },
});

