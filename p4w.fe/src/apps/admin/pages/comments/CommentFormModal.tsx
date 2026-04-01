import { Button, Modal, Row, Col, Tag } from "antd";

import { formatDate } from "@/shared/utils/formatDate";
import {
  FieldLabel,
  FieldValue,
  FieldWrap,
  HeaderHint,
  HeaderMain,
  HeaderRow,
  HeaderSubtitle,
  HeaderText,
  HeaderTitle,
  ModalContent,
  ModalHeader,
  ModalWrapper,
  SectionCard,
  SectionStack,
  SectionTitle,
  modalBodyStyles,
} from "@/apps/admin/components/styled";

type CommentStatus = "active" | "inactive";

export interface CommentFormData {
  id?: string;
  reviewId?: string;
  parentId?: string | null;
  userId?: string;
  userName?: string;
  locationId?: string;
  locationName?: string;
  reviewContent?: string;
  content?: string;
  status?: CommentStatus;
  createdAt?: string;
}

interface CommentFormModalProps {
  open: boolean;
  data?: CommentFormData;
  loading?: boolean;
  onCancel: () => void;
}

const InfoField = ({ label, value }: { label: string; value?: string | number | null }) => (
  <FieldWrap>
    <FieldLabel>{label}</FieldLabel>
    <FieldValue>{value || "Chưa cập nhật"}</FieldValue>
  </FieldWrap>
);

export default function CommentFormModal({ open, data, loading, onCancel }: CommentFormModalProps) {
  const active = data?.status === "active";

  return (
    <Modal open={open} onCancel={onCancel} footer={null} width={980} centered styles={modalBodyStyles}>
      <ModalWrapper>
        <ModalHeader>
          <HeaderRow>
            <HeaderMain>
              <HeaderText>
                <HeaderTitle>{data?.userName || "Chi tiet binh luan"}</HeaderTitle>
                <HeaderSubtitle>{data?.locationName || "Chua co dia diem"}</HeaderSubtitle>
                <HeaderHint>ID: {data?.id || "--"}</HeaderHint>
              </HeaderText>
            </HeaderMain>
            <Tag color={active ? "#ecfdf3" : "#f3f4f6"} style={{ color: active ? "#16a34a" : "#6b7280", borderRadius: 999, border: "none", paddingInline: 12 }}>
              {active ? "Đang hiển thị" : "Đã ẩn"}
            </Tag>
          </HeaderRow>
        </ModalHeader>

        <ModalContent>
          <SectionStack>
            <SectionCard>
              <SectionTitle>Thông tin binh luan</SectionTitle>
              <Row gutter={[24, 8]}>
                <Col xs={24} md={12}>
                  <InfoField label="Người dùng" value={data?.userName} />
                  <InfoField label="User ID" value={data?.userId} />
                  <InfoField label="Dia diem" value={data?.locationName} />
                </Col>
                <Col xs={24} md={12}>
                  <InfoField label="Review ID" value={data?.reviewId} />
                  <InfoField label="Location ID" value={data?.locationId} />
                  <InfoField label="Ngày tạo" value={data?.createdAt ? formatDate(data.createdAt) : undefined} />
                </Col>
              </Row>
              <InfoField label="Parent comment ID" value={data?.parentId} />
              <InfoField label="Nội dung review" value={data?.reviewContent} />
              <InfoField label="Nội dung binh luan" value={data?.content} />
            </SectionCard>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button loading={loading} onClick={onCancel}>Đóng</Button>
            </div>
          </SectionStack>
        </ModalContent>
      </ModalWrapper>
    </Modal>
  );
}

