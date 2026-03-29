import { Avatar, Col, Modal, Row, Tag } from "antd";
import dayjs from "dayjs";

import type { IUserResponse } from "../../services/type";
import {
  AvatarShell,
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

type UserFormModalMode = "view";

interface UserFormModalProps {
  open: boolean;
  mode: UserFormModalMode;
  data?: IUserResponse;
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (values: IUserResponse) => void | Promise<void>;
}

const renderValue = (value?: string | number | null) => {
  if (value === undefined || value === null || value === "") {
    return "Chua cap nhat";
  }

  return String(value);
};

const formatDate = (value?: string) => {
  if (!value) {
    return "Chua cap nhat";
  }

  const parsed = dayjs(value);
  return parsed.isValid() ? parsed.format("DD/MM/YYYY") : value;
};

const formatStatus = (value?: string) => {
  switch (value) {
    case "active":
      return { label: "Hoat dong", color: "#16a34a", bg: "#ecfdf3" };
    case "locked":
      return { label: "Khoa", color: "#dc2626", bg: "#fef2f2" };
    default:
      return { label: "Khong hoat dong", color: "#f59e0b", bg: "#fffbeb" };
  }
};

const InfoField = ({ label, value }: { label: string; value?: string | number | null }) => (
  <FieldWrap>
    <FieldLabel>{label}</FieldLabel>
    <FieldValue>{renderValue(value)}</FieldValue>
  </FieldWrap>
);

export function UserFormModal({ open, mode, data, loading, onCancel, onSubmit }: UserFormModalProps) {
  void mode;
  void loading;
  void onSubmit;

  const displayName = data?.userName || "User";
  const avatarSrc = data?.mediaLinkUrl;
  const avatarFallback = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  const statusMeta = formatStatus(data?.statusName);

  return (
    <Modal open={open} onCancel={onCancel} footer={null} width={1100} centered styles={modalBodyStyles}>
      <ModalWrapper>
        <ModalHeader>
          <HeaderRow>
            <HeaderMain>
              <AvatarShell>
                <Avatar
                  size={110}
                  src={avatarSrc}
                  style={{
                    background: "#f4f1ff",
                    color: "var(--primary, #8c80cc)",
                    border: "4px solid rgba(255,255,255,0.92)",
                    boxShadow: "0 12px 26px rgba(15, 23, 42, 0.18)",
                  }}
                >
                  {!avatarSrc ? avatarFallback : null}
                </Avatar>
              </AvatarShell>

              <HeaderText>
                <HeaderTitle>{displayName}</HeaderTitle>
                <HeaderSubtitle>{renderValue(data?.roleName)}</HeaderSubtitle>
                <HeaderHint>ID: {renderValue(data?.id)}</HeaderHint>
              </HeaderText>
            </HeaderMain>
          </HeaderRow>
        </ModalHeader>

        <ModalContent>
          <SectionStack>
            <SectionCard>
              <SectionTitle>Thong tin nguoi dung</SectionTitle>
              <Row gutter={[48, 8]}>
                <Col xs={24} md={12}>
                  <InfoField label="User name" value={data?.userName} />
                  <InfoField label="Email" value={data?.email} />
                  <InfoField label="Role id" value={data?.roleId} />
                  <InfoField label="Vai tro" value={data?.roleName} />
                </Col>
                <Col xs={24} md={12}>
                  <InfoField label="Ngay sinh" value={formatDate(data?.dateOfBirth)} />
                  <FieldWrap>
                    <FieldLabel>Trang thai</FieldLabel>
                    <FieldValue>
                      <Tag
                        color={statusMeta.bg}
                        style={{
                          color: statusMeta.color,
                          borderRadius: 999,
                          border: "none",
                          paddingInline: 12,
                        }}
                      >
                        {statusMeta.label}
                      </Tag>
                    </FieldValue>
                  </FieldWrap>
                </Col>
              </Row>
            </SectionCard>

            <SectionCard>
              <SectionTitle>Dia diem so huu</SectionTitle>
              {data?.ownedLocations?.length ? (
                <Row gutter={[24, 16]}>
                  {data.ownedLocations.map((location) => (
                    <Col xs={24} md={12} key={location.id}>
                      <FieldWrap style={{ marginBottom: 0 }}>
                        <FieldLabel>{renderValue(location.locationName)}</FieldLabel>
                        <FieldValue>{renderValue(location.address)}</FieldValue>
                        <div style={{ marginTop: 8 }}>
                          <Tag
                            color="#f3f4f6"
                            style={{
                              color: "#4b5563",
                              borderRadius: 999,
                              border: "none",
                              paddingInline: 12,
                            }}
                          >
                            {renderValue(location.statusName)}
                          </Tag>
                        </div>
                      </FieldWrap>
                    </Col>
                  ))}
                </Row>
              ) : (
                <FieldValue>Chua co dia diem so huu</FieldValue>
              )}
            </SectionCard>
          </SectionStack>
        </ModalContent>
      </ModalWrapper>
    </Modal>
  );
}

export default UserFormModal;
