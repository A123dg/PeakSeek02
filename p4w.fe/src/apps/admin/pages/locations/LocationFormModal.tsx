import { Button, Image, Tag } from "antd";
import styled from "styled-components";

import BaseModal from "@shared/components/modals";
import {
  FieldLabel,
  FieldValue,
  FieldWrap,
  HeaderHint,
  HeaderMain,
  HeaderRow,
  HeaderSubtitle,
  HeaderTitle,
  ModalContent,
  ModalHeader,
  ModalWrapper,
  SectionCard,
  SectionStack,
  SectionTitle,
} from "@/apps/admin/components/styled";

type LocationFormModalMode = "view";

export interface LocationFormData {
  id?: string;
  ownerId?: string | null;
  name?: string;
  type?: number;
  address?: string;
  addressLink?: string;
  openingHours?: string;
  closingHours?: string;
  description?: string;
  status?: number;
  mediaLinkUrls?: string[];
  pendingMediaLinkUrls?: string[];
}

interface LocationFormModalProps {
  open: boolean;
  mode: LocationFormModalMode;
  data?: LocationFormData;
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (values: LocationFormData) => void | Promise<void>;
}

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 24px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const StatusBadge = styled(Tag)<{ $tone: "pending" | "approved" | "rejected" | "active" | "inactive" }>`
  border: none;
  border-radius: 999px;
  padding: 6px 12px;
  font-weight: 700;
  margin: 0;
  ${({ $tone }) => {
    switch ($tone) {
      case "pending":
        return "background:#fff7e6;color:#d97706;";
      case "approved":
      case "active":
        return "background:#ecfdf3;color:#15803d;";
      case "rejected":
        return "background:#fef2f2;color:#dc2626;";
      default:
        return "background:#f3f4f6;color:#6b7280;";
    }
  }}
`;

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 14px;
`;

const MediaCard = styled.a`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  background: #fff;
  text-decoration: none;
`;

const MediaLink = styled.div`
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
  word-break: break-all;
`;

const EmptyMedia = styled.div`
  padding: 16px;
  border-radius: 16px;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  color: #64748b;
  text-align: center;
`;

const FooterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 0 24px 24px;
`;

const typeMap: Record<number, string> = {
  1: "Thu vien",
  2: "Quan ca phe",
  3: "Nha sach",
  4: "Coworking",
  5: "Study cafe",
  6: "Van phong",
};

const statusMap: Record<number, { label: string; tone: "pending" | "approved" | "rejected" | "active" | "inactive" }> = {
  0: { label: "Đã ẩn", tone: "inactive" },
  1: { label: "Chờ duyệt", tone: "pending" },
  2: { label: "Đã duyệt", tone: "approved" },
  3: { label: "Từ chối", tone: "rejected" },
  4: { label: "Đang hiển thị", tone: "active" },
};

const renderMedia = (mediaLinkUrls?: string[]) => {
  if (!mediaLinkUrls?.length) {
    return <EmptyMedia>Không có media</EmptyMedia>;
  }

  return (
    <MediaGrid>
      {mediaLinkUrls.map((url) => (
        <MediaCard key={url} href={url} target="_blank" rel="noreferrer">
          <Image
            src={url}
            height={120}
            style={{ objectFit: "cover", borderRadius: 12 }}
            fallback="data:image/gif;base64,R0lGODlhAQABAAAAACw="
          />
          <MediaLink>{url}</MediaLink>
        </MediaCard>
      ))}
    </MediaGrid>
  );
};

const DetailField = ({ label, value }: { label: string; value?: string | number | null }) => (
  <FieldWrap>
    <FieldLabel>{label}</FieldLabel>
    <FieldValue>{value || "Chưa cập nhật"}</FieldValue>
  </FieldWrap>
);

export function LocationFormModal({
  open,
  data,
  loading,
  onCancel,
  onSubmit,
}: LocationFormModalProps) {
  const statusMeta = statusMap[data?.status ?? 0] ?? statusMap[0];
  const canApprove = data?.status === 1;

  return (
    <BaseModal
      open={open}
      title={null}
      hideModal={onCancel}
      onCancel={onCancel}
      onOk={canApprove ? () => void onSubmit(data ?? {}) : onCancel}
      okText={canApprove ? "Duyệt địa điểm" : "Đóng"}
      cancelText={canApprove ? "Đóng" : undefined}
      loading={loading}
      width={1040}
      footer={null}
      showHeader={false}
    >
      <ModalWrapper>
        <ModalHeader>
          <HeaderRow>
            <HeaderMain>
              <div>
                <HeaderTitle>{data?.name || "Chi tiet dia diem"}</HeaderTitle>
                <HeaderSubtitle>{data?.address || "Chưa cập nhật địa chỉ"}</HeaderSubtitle>
                <HeaderHint>ID: {data?.id || "--"}</HeaderHint>
              </div>
            </HeaderMain>

            <StatusBadge $tone={statusMeta.tone}>{statusMeta.label}</StatusBadge>
          </HeaderRow>
        </ModalHeader>

        <ModalContent>
          <SectionStack>
            <SectionCard>
              <SectionTitle>Thông tin dia diem</SectionTitle>
              <DetailGrid>
                <DetailField label="Loai hinh" value={data?.type ? typeMap[data.type] ?? `Loai ${data.type}` : null} />
                <DetailField label="Chu so huu" value={data?.ownerId} />
                <DetailField label="Gio mo cua" value={data?.openingHours} />
                <DetailField label="Gio dong cua" value={data?.closingHours} />
                <DetailField label="Địa chỉ" value={data?.address} />
                <DetailField label="Link địa chỉ" value={data?.addressLink} />
              </DetailGrid>

              <FieldWrap>
                <FieldLabel>Mo ta</FieldLabel>
                <FieldValue>{data?.description || "Chua co mo ta"}</FieldValue>
              </FieldWrap>
            </SectionCard>

            <SectionCard>
              <SectionTitle>Hình ảnh hiện tại</SectionTitle>
              {renderMedia(data?.mediaLinkUrls)}
            </SectionCard>

            {data?.pendingMediaLinkUrls?.length ? (
              <SectionCard>
                <SectionTitle>Media chờ duyệt</SectionTitle>
                {renderMedia(data.pendingMediaLinkUrls)}
              </SectionCard>
            ) : null}
          </SectionStack>
        </ModalContent>

        <FooterActions>
          <Button onClick={onCancel}>Đóng</Button>
          {canApprove ? (
            <Button type="primary" loading={loading} onClick={() => void onSubmit(data ?? {})}>
              Duyệt địa điểm
            </Button>
          ) : null}
        </FooterActions>
      </ModalWrapper>
    </BaseModal>
  );
}

export default LocationFormModal;

