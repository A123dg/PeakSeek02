import { useState } from "react";

import type { LocationFormData } from "../../LocationFormModal";
import type { LocationRow } from "./useData";

export const useLocationActions = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view">("view");
  const [selectedLocation, setSelectedLocation] = useState<LocationRow | null>(null);

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
    void values;
    handleModalCancel();
  };

  return {
    modalOpen,
    modalMode,
    selectedLocation,
    loading: false,
    handleOpenViewModal,
    handleModalCancel,
    handleModalSubmit,
  };
};
