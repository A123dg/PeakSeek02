import React from "react";
import { Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { ProfileLocationForm } from "@/components/app/ProfileLocationForm";

export default function ProfileLocationUpdateScreen() {
  const params = useLocalSearchParams<{
    id?: string;
    locationName?: string;
    address?: string;
    status?: string;
    statusName?: string;
  }>();

  return (
    <ProfileLocationForm
      title="Cap nhat dia diem"
      subtitle={params.statusName ? `Trang thai hien tai: ${params.statusName}` : "UI da duoc refactor de dung chung voi man dang ky dia diem"}
      submitLabel="Luu thay doi"
      initialValues={{
        locationName: params.locationName ?? "Dia diem mau",
        description: params.id ? `Dang chuan bi cap nhat cho dia diem ${params.id}` : "Cap nhat thong tin dia diem da co",
        address: params.address ?? "12 Nguyen Huu, Quan 1, TP.HCM",
        openingHours: "08:00:00",
        closingHours: "22:00:00",
        type: "1",
      }}
      onSubmit={async () => {
        Alert.alert("Chua ho tro", "Owner-side update location chua co endpoint rieng.");
      }}
    />
  );
}
