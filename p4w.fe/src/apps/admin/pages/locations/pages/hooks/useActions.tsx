import { useState } from "react";
import { message } from "antd";

import type { LocationFormData } from "../../LocationFormModal";
import { useUpdateLocation } from "../../services/mutation";
import type { LocationRow } from "./useData";

export const useLocationActions = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view">("view");
  const [selectedLocation, setSelectedLocation] = useState<LocationRow | null>(null);
  const { mutateAsync: updateLocation, isLoading } = useUpdateLocation();

  const handleOpenViewModal = (record: LocationRow) => {
    setModalMode("view");
    setSelectedLocation(record);
    setModalOpen(true);
  };

  const handleModalCancel = () => {
    setModalOpen(false);
    setSelectedLocation(null);
  };

  const handleModalSubmit = async (values: LocationFormData) => {
    try {
      if (!selectedLocation || selectedLocation.status !== "pending") {
        void values;
        handleModalCancel();
        return;
      }

      await updateLocation({
        id: selectedLocation.id,
        data: {
          status: 4,
        },
      });

      message.success("Duyệt địa điểm thanh cong");
      handleModalCancel();
    } catch {
      message.error("Co loi xay ra");
    }
  };

  const handleApproveLocation = async (record: LocationRow) => {
    try {
      await updateLocation({
        id: record.id,
        data: {
          status: 4,
        },
      });

      message.success("Duyệt địa điểm thanh cong");
    } catch {
      message.error("Co loi xay ra");
    }
  };

  return {
    modalOpen,
    modalMode,
    selectedLocation,
    loading: isLoading,
    handleOpenViewModal,
    handleModalCancel,
    handleModalSubmit,
    handleApproveLocation,
  };
};

