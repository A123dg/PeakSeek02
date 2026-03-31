import React, { useCallback, useEffect, useState } from "react";
import { Alert, RefreshControl, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { GoSitemapButton } from "@/components/app/GoSiteMapButton";
import { PersonalInfoModal } from "@/components/app/profile/PersonalInfoModal";
import { ProfileHeroCard } from "@/components/app/profile/ProfileHeroCard";
import { ProfileMenuGroup } from "@/components/app/profile/ProfileMenuGroup";
import { useAuth } from "@/contexts/AuthContext";
import { uploadImageApi } from "@/services/api";

export const ProfileScreen = () => {
  const { profile, logout, refreshProfile, isAuthenticated, updateProfile, isLoading } = useAuth();
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [draftEmail, setDraftEmail] = useState("");
  const [draftDob, setDraftDob] = useState<Date>(new Date());
  const [selectedAvatarUri, setSelectedAvatarUri] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refreshProfile();
    } finally {
      setIsRefreshing(false);
    }
  }, [refreshProfile]);

  useEffect(() => {
    if (isAuthenticated) {
      void refreshProfile();
    }
  }, [isAuthenticated, refreshProfile]);

  useEffect(() => {
    if (!isProfileModalVisible) {
      return;
    }

    setDraftName(profile?.userName ?? "");
    setDraftEmail(profile?.email ?? "");
    setSelectedAvatarUri(profile?.mediaLinkUrl || null);
    setDraftDob(profile?.dateOfBirth ? new Date(profile.dateOfBirth) : new Date());
  }, [isProfileModalVisible, profile]);

  const openProfileModal = () => setIsProfileModalVisible(true);
  const closeProfileModal = () => setIsProfileModalVisible(false);

  const onPressLogout = () => {
    Alert.alert("Dang xuat", "Ban co chac muon dang xuat khong?", [
      { text: "Huy", style: "cancel" },
      {
        text: "Dang xuat",
        style: "destructive",
        onPress: () => {
          logout();
          router.replace("/auth/login/Login");
        },
      },
    ]);
  };

  const selectImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Cho phep ung dung truy cap anh cua ban");
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) {
      return null;
    }

    return result.assets[0].uri;
  };

  const uploadAvatar = async (uri: string) => {
    const uploadResponse = await uploadImageApi({
      uri,
      name: "avatar.jpg",
      type: "image/jpeg",
    });

    if (!uploadResponse.data) {
      throw new Error("Khong nhan duoc URL anh sau khi upload.");
    }

    return uploadResponse.data;
  };

  const handleQuickAvatarUpdate = async () => {
    try {
      if (!profile) {
        Alert.alert("Chua dang nhap", "Ban can dang nhap de cap nhat avatar.");
        return;
      }

      const imageUri = await selectImage();
      if (!imageUri) {
        return;
      }

      const mediaLinkUrl = await uploadAvatar(imageUri);
      await updateProfile({
        userName: profile.userName,
        email: profile.email,
        dateOfBirth: profile.dateOfBirth ?? undefined,
        mediaLinkUrl,
      });

      Alert.alert("Thanh cong", "Da cap nhat avatar.");
    } catch (error) {
      Alert.alert("Cap nhat avatar that bai", error instanceof Error ? error.message : "Co loi xay ra");
    }
  };

  const handleDraftAvatarPick = async () => {
    const imageUri = await selectImage();
    if (imageUri) {
      setSelectedAvatarUri(imageUri);
    }
  };

  const handleSaveProfile = async () => {
    try {
      if (!draftName.trim()) {
        Alert.alert("Thieu thong tin", "Vui long nhap ten nguoi dung.");
        return;
      }

      if (!draftEmail.trim()) {
        Alert.alert("Thieu thong tin", "Vui long nhap email.");
        return;
      }

      let mediaLinkUrl = profile?.mediaLinkUrl ?? undefined;
      if (selectedAvatarUri && selectedAvatarUri !== profile?.mediaLinkUrl) {
        mediaLinkUrl = await uploadAvatar(selectedAvatarUri);
      }

      await updateProfile({
        userName: draftName.trim(),
        email: draftEmail.trim(),
        dateOfBirth: draftDob.toISOString(),
        mediaLinkUrl,
      });

      closeProfileModal();
      Alert.alert("Thanh cong", "Da cap nhat thong tin ca nhan.");
    } catch (error) {
      Alert.alert("Cap nhat that bai", error instanceof Error ? error.message : "Co loi xay ra");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => void handleRefresh()} />}
      >
        <ProfileHeroCard
          email={profile?.email}
          mediaLinkUrl={profile?.mediaLinkUrl}
          userName={profile?.userName}
          onAvatarPress={handleQuickAvatarUpdate}
          menu={
            <ProfileMenuGroup
              items={[
                { icon: "create-outline", title: "Cap nhat thong tin", onPress: openProfileModal },
                {
                  icon: "location-outline",
                  title: "Dia diem cua ban",
                  onPress: () => router.push("/(tabs)/profile/location-info"),
                },
                { icon: "log-out-outline", title: "Dang xuat", onPress: onPressLogout, danger: true },
              ]}
              footer={<GoSitemapButton />}
            />
          }
        />
      </ScrollView>

      <PersonalInfoModal
        draftDob={draftDob}
        draftEmail={draftEmail}
        draftName={draftName}
        isLoading={isLoading}
        onAvatarPress={handleDraftAvatarPick}
        onClose={closeProfileModal}
        onDateChange={setDraftDob}
        onEmailChange={setDraftEmail}
        onNameChange={setDraftName}
        onSave={handleSaveProfile}
        selectedAvatarUri={selectedAvatarUri}
        visible={isProfileModalVisible}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F4FBF7",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
});
