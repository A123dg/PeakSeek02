import { Button, Image, Rate, Tag } from "antd";
import styled from "styled-components";

import BaseModal from "@shared/components/modals";
import { formatDate } from "@/shared/utils/formatDate";
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

type ReviewFormModalMode = "view" | "edit" | "approve";

export interface ReviewFormData {
  id?: string;
  user?: string;
  location?: string;
  rating?: number;
  content?: string;
  createdAt?: string;
  status: "active" | "inactive";
  mediaLinkUrls?: string[];
}

interface ReviewFormModalProps {
  open: boolean;
  mode: ReviewFormModalMode;
  data?: ReviewFormData;
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (values: ReviewFormData) => void | Promise<void>;
}

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 24px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const FooterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 0 24px 24px;
`;

const StatusBadge = styled(Tag)<{ $active: boolean }>`
  border: none;
  border-radius: 999px;
  padding: 6px 12px;
  font-weight: 700;
  margin: 0;
  background: ${({ $active }) => ($active ? "#ecfdf3" : "#f3f4f6")};
  color: ${({ $active }) => ($active ? "#15803d" : "#6b7280")};
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

const DetailField = ({ label, value }: { label: string; value?: string | number | null }) => (
  <FieldWrap>
    <FieldLabel>{label}</FieldLabel>
    <FieldValue>{value || "Chua cap nhat"}</FieldValue>
  </FieldWrap>
);

const renderMedia = (mediaLinkUrls?: string[]) => {
  if (!mediaLinkUrls?.length) {
    return <EmptyMedia>Khong co media</EmptyMedia>;
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

export function ReviewFormModal({
  open,
  data,
  loading,
  onCancel,
}: ReviewFormModalProps) {
  const isActive = data?.status === "active";

  return (
    <BaseModal
      open={open}
      title={null}
      hideModal={onCancel}
      onCancel={onCancel}
      onOk={onCancel}
      okText="Dong"
      cancelText={undefined}
      loading={loading}
      width={980}
      footer={null}
      showHeader={false}
    >
      <ModalWrapper>
        <ModalHeader>
          <HeaderRow>
            <HeaderMain>
              <div>
                <HeaderTitle>{data?.location || "Chi tiet danh gia"}</HeaderTitle>
                <HeaderSubtitle>{data?.user || "Nguoi dung chua xac dinh"}</HeaderSubtitle>
                <HeaderHint>ID: {data?.id || "--"}</HeaderHint>
              </div>
            </HeaderMain>

            <StatusBadge $active={isActive}>{isActive ? "Dang hien thi" : "Da an"}</StatusBadge>
          </HeaderRow>
        </ModalHeader>

        <ModalContent>
          <SectionStack>
            <SectionCard>
              <SectionTitle>Thong tin danh gia</SectionTitle>
              <DetailGrid>
                <DetailField label="Nguoi dung" value={data?.user} />
                <DetailField label="Dia diem" value={data?.location} />
                <FieldWrap>
                  <FieldLabel>So sao</FieldLabel>
                  <FieldValue>
                    <Rate disabled value={data?.rating ?? 0} />
                  </FieldValue>
                </FieldWrap>
                <DetailField label="Thoi gian tao" value={data?.createdAt ? formatDate(data.createdAt) : undefined} />
              </DetailGrid>

              <FieldWrap>
                <FieldLabel>Noi dung</FieldLabel>
                <FieldValue>{data?.content || "Chua co noi dung"}</FieldValue>
              </FieldWrap>
            </SectionCard>

            <SectionCard>
              <SectionTitle>Media URL</SectionTitle>
              {renderMedia(data?.mediaLinkUrls)}
            </SectionCard>
          </SectionStack>
        </ModalContent>

        <FooterActions>
          <Button onClick={onCancel}>Dong</Button>
        </FooterActions>
      </ModalWrapper>
    </BaseModal>
  );
}

export default ReviewFormModal;
