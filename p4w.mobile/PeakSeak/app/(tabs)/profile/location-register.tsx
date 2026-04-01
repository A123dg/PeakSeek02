import React, { useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";

import { ProfileLocationForm } from "@/components/app/ProfileLocationForm";
import { useAuth } from "@/contexts/AuthContext";
import { createLocationApi, uploadImageApi } from "@/services/api";

export default function ProfileLocationRegisterScreen() {
  const { authorizedRequest, refreshProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    try {
      setIsSubmitting(true);

      const mediaLinkUrls =
        values.mediaUris.length > 0
          ? await Promise.all(
              values.mediaUris.map((uri, index) =>
                uploadImageApi({
                  uri,
                  name: `location-${index + 1}.jpg`,
                  type: "image/jpeg",
                }).then((response) => {
                  if (!response.data) {
                    throw new Error(`Upload ảnh ${index + 1} thất bại.`);
                  }

                  return response.data;
                })
              )
            )
          : [];

      await authorizedRequest((token) =>
        createLocationApi(
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
      Alert.alert("Thành công", "Đã gửi đăng ký địa điểm. Địa điểm sẽ chờ admin duyệt.");
      router.back();
    } catch (error) {
      Alert.alert("Đăng ký thất bại", error instanceof Error ? error.message : "Có lỗi xảy ra");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProfileLocationForm
      title="Đăng ký địa điểm"
      subtitle="Gửi thông tin địa điểm mới để hệ thống tiếp nhận"
      submitLabel="Gửi đăng ký"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
}

