export const formatProfileDate = (value?: string | null) => {
  if (!value) {
    return "Chua cap nhat";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("vi-VN");
};

export const normalizeLocationStatusLabel = (value?: string | null) => {
  switch (value?.toLowerCase()) {
    case "approved":
      return "Da duyet";
    case "pending":
      return "Cho duyet";
    case "rejected":
      return "Tu choi";
    case "active":
      return "Dang hoat dong";
    case "inactive":
      return "Ngung hoat dong";
    default:
      return value || "Khong ro";
  }
};
