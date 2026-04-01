export const formatProfileDate = (value?: string | null) => {
  if (!value) {
    return "Chưa cập nhật";
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
      return "Đã duyệt";
    case "pending":
      return "Chờ duyệt";
    case "rejected":
      return "Từ chối";
    case "active":
      return "Đang hoạt động";
    case "inactive":
      return "Ngừng hoạt động";
    default:
      return value || "Không rõ";
  }
};

