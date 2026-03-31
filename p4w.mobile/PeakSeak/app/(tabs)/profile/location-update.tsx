import React, { useState } from "react";
import { Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { ProfileLocationForm } from "@/components/app/ProfileLocationForm";
import { useAuth } from "@/contexts/AuthContext";
import { updateLocationApi, uploadImageApi } from "@/services/api";

export default function ProfileLocationUpdateScreen() {
  const { authorizedRequest, refreshProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useLocalSearchParams<{
    id?: string;
    locationName?: string;
    address?: string;
    addressLink?: string;
    mediaLinkUrls?: string;
    status?: string;
    statusName?: string;
  }>();
  const initialMediaUris = (() => {
    if (!params.mediaLinkUrls) {
      return [];
    }

    try {
      const parsed = JSON.parse(params.mediaLinkUrls);
      return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
    } catch {
      return [];
    }
  })();

  const handleSubmit = async (values: {
    locationName: string;
    description: string;
    address: string;
    addressLink: string;
    openingHours: string;
    closingHours: string;
    type: string;
    mediaUris: string[];
  }) => {
    if (!params.id) {
      Alert.alert("Khong hop le", "Khong tim thay id dia diem de cap nhat.");
      return;
    }

    try {
      setIsSubmitting(true);

      const existingMediaLinkUrls = values.mediaUris.filter((uri) => /^https?:\/\//i.test(uri));
      const localMediaUris = values.mediaUris.filter((uri) => !/^https?:\/\//i.test(uri));

      const uploadedMediaLinkUrls =
        localMediaUris.length > 0
          ? await Promise.all(
              localMediaUris.map((uri, index) =>
                uploadImageApi({
                  uri,
                  name: `location-update-${index + 1}.jpg`,
                  type: "image/jpeg",
                }).then((response) => {
                  if (!response.data) {
                    throw new Error(`Upload anh ${index + 1} that bai.`);
                  }

                  return response.data;
                })
              )
            )
          : [];
      const mediaLinkUrls = [...existingMediaLinkUrls, ...uploadedMediaLinkUrls].slice(0, 5);

      await authorizedRequest((token) =>
        updateLocationApi(
          params.id!,
          {
            locationName: values.locationName.trim(),
            description: values.description.trim() || undefined,
            address: values.address.trim(),
            addressLink: values.addressLink.trim() || undefined,
            openingHours: values.openingHours.trim() || undefined,
            closingHours: values.closingHours.trim() || undefined,
            type: Number(values.type),
            mediaLinkUrls,
          },
          token
        )
      );

      await refreshProfile();
      Alert.alert("Thanh cong", "Da gui yeu cau cap nhat dia diem. Thay doi se duoc ap dung sau khi admin duyet.");
      router.back();
    } catch (error) {
      Alert.alert("Cap nhat that bai", error instanceof Error ? error.message : "Co loi xay ra");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProfileLocationForm
      title="Cap nhat dia diem"
      subtitle={params.statusName ? `Trang thai hien tai: ${params.statusName}` : "UI da duoc refactor de dung chung voi man dang ky dia diem"}
      submitLabel="Luu thay doi"
      isSubmitting={isSubmitting}
      initialValues={{
        locationName: params.locationName ?? "Dia diem mau",
        description: params.id ? `Dang chuan bi cap nhat cho dia diem ${params.id}` : "Cap nhat thong tin dia diem da co",
        address: params.address ?? "12 Nguyen Huu, Quan 1, TP.HCM",
        addressLink: params.addressLink ?? "",
        mediaUris: initialMediaUris,
        openingHours: "08:00:00",
        closingHours: "22:00:00",
        type: "1",
      }}
      onSubmit={handleSubmit}
    />
  );
}
