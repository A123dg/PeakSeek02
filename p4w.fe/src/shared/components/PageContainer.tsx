import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import { Breadcrumb, Button, Space } from "antd";
import React from "react";

interface PageContainerProps {
  breadcrumbItems: Array<{ title: React.ReactNode; path?: string, search?: any }>;
  children: React.ReactNode;
  showNavButtons?: boolean;
  onBack?: () => void;
  showBreadcrumb?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  breadcrumbItems = [],
  children,
  showNavButtons = true,
  showBreadcrumb = true,
  onBack,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back(); // Browser back
    }
  };

  return (
    <div className="page-wrapper">
      {/* FIX: Navigation + Breadcrumb Header */}
      <div
        style={{
          display: showBreadcrumb ? "flex" : "none",
          alignItems: "center",
          gap: "var(--gap-global)",
          padding: "0.48rem 1.6rem",
          backgroundColor: "#fff",
          borderBottom: "1px solid #d9d9d9",
        }}
      >
        {/* FIX: Navigation Buttons */}
        {showNavButtons && (
          <Space size={8} style={{ marginLeft: "-8px" }}>
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              size="small"
              onClick={handleBack}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#666",
              }}
              title="Quay lại"
            />
          </Space>
        )}
        <Breadcrumb
          style={{
            fontWeight: 500,
            fontSize: "18px",
            color: "#112A46",
            flex: 1,
          }}
          items={(breadcrumbItems || []).map((item, index) => ({
            key: index,
            title: item.path ? (
              <span
                style={{
                  color: "#000",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
                onClick={() => navigate({ to: item.path!, search: item.search })}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                {item.title}
              </span>
            ) : (
              <span style={{ color: "#1f1f1f", fontWeight: 500 }}>
                {item.title}
              </span>
            ),
          }))}
        />
      </div>

      {/* Page Content */}
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
};
