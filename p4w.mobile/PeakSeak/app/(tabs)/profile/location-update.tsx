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
      Alert.alert("Không hợp lệ", "Không tìm thấy id địa điểm để cập nhật.");
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
                    throw new Error(`Upload ảnh ${index + 1} thất bại.`);
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
      Alert.alert("Thành công", "Đã gửi yêu cầu cập nhật địa điểm. Thay đổi sẽ được áp dụng sau khi admin duyệt.");
      router.back();
    } catch (error) {
      Alert.alert("Cập nhật thất bại", error instanceof Error ? error.message : "Có lỗi xảy ra");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProfileLocationForm
      title="Cập nhật địa điểm"
      subtitle={params.statusName ? `Trạng thái hiện tại: ${params.statusName}` : "UI đã được refactor để dùng chung với màn đăng ký địa điểm"}
      submitLabel="Lưu thay đổi"
      isSubmitting={isSubmitting}
      initialValues={{
        locationName: params.locationName ?? "Địa điểm mẫu",
        description: params.id ? `Đang chuẩn bị cập nhật cho địa điểm ${params.id}` : "Cập nhật thông tin địa điểm đã có",
        address: params.address ?? "12 Nguyen Huu, Quận 1, TP.HCM",
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

