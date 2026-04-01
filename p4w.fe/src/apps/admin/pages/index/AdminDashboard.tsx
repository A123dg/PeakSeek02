import { Skeleton } from "antd";

import { PageContainer } from "@/shared/components/PageContainer";
import { useAdminDashboardQuery } from "./services/query";
import type { IAdminDashboardRatio } from "./services/type";
import {
  APPROVED_COLOR,
  Breakdown,
  BreakdownCard,
  BreakdownHint,
  BreakdownLabel,
  BreakdownRow,
  BreakdownValue,
  DashboardStack,
  DonutCenter,
  DonutHolder,
  DonutLabel,
  DonutSvg,
  DonutValue,
  DonutWrap,
  Dot,
  HeroCard,
  HeroEyebrow,
  HeroGrid,
  HeroSubTitle,
  HeroTitle,
  LoadingShell,
  MetricCard,
  MetricHint,
  MetricLabel,
  MetricStrip,
  MetricValue,
  PENDING_COLOR,
  ProgressFill,
  ProgressTrack,
  RatioBody,
  RatioCard,
  RatioGrid,
  RatioHeader,
  RatioText,
  RatioTitle,
} from "./styled";

const formatPercent = (value: number) => `${Number(value || 0).toFixed(2)}%`;

const RatioDonut = ({ ratio }: { ratio: IAdminDashboardRatio }) => {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const approvedPercent = Math.max(0, Math.min(100, ratio.approvedPercentage || 0));
  const approvedLength = (approvedPercent / 100) * circumference;
  const pendingLength = circumference - approvedLength;

  return (
    <DonutHolder>
      <DonutWrap>
        <DonutSvg viewBox="0 0 140 140" aria-hidden="true">
          <circle cx="70" cy="70" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="14" />
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={APPROVED_COLOR}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={`${approvedLength} ${circumference}`}
            transform="rotate(-90 70 70)"
          />
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={PENDING_COLOR}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={`${pendingLength} ${circumference}`}
            strokeDashoffset={-approvedLength}
            transform="rotate(-90 70 70)"
            opacity={pendingLength === 0 ? 0 : 1}
          />
        </DonutSvg>
      </DonutWrap>

      <DonutCenter>
        <DonutValue>{Math.round(approvedPercent)}%</DonutValue>
        <DonutLabel>Đã duyệt</DonutLabel>
      </DonutCenter>
    </DonutHolder>
  );
};

const RatioPanel = ({
  title,
  description,
  ratio,
}: {
  title: string;
  description: string;
  ratio: IAdminDashboardRatio;
}) => {
  const total = ratio.approvedCount + ratio.pendingCount;

  return (
    <RatioCard>
      <RatioHeader>
        <div>
          <RatioTitle>{title}</RatioTitle>
          <RatioText>{description}</RatioText>
        </div>
      </RatioHeader>

      <RatioBody>
        <DonutWrap>
          <RatioDonut ratio={ratio} />
        </DonutWrap>

        <Breakdown>
          <BreakdownCard>
            <BreakdownRow>
              <BreakdownLabel>
                <Dot $color={APPROVED_COLOR} />
                Đã duyệt
              </BreakdownLabel>
              <BreakdownValue>{ratio.approvedCount}</BreakdownValue>
            </BreakdownRow>
            <ProgressTrack>
              <ProgressFill $width={ratio.approvedPercentage} $color={APPROVED_COLOR} />
            </ProgressTrack>
            <BreakdownHint>{formatPercent(ratio.approvedPercentage)}</BreakdownHint>
          </BreakdownCard>

          <BreakdownCard>
            <BreakdownRow>
              <BreakdownLabel>
                <Dot $color={PENDING_COLOR} />
                Chờ duyệt
              </BreakdownLabel>
              <BreakdownValue>{ratio.pendingCount}</BreakdownValue>
            </BreakdownRow>
            <ProgressTrack>
              <ProgressFill $width={ratio.pendingPercentage} $color={PENDING_COLOR} />
            </ProgressTrack>
            <BreakdownHint>{formatPercent(ratio.pendingPercentage)}</BreakdownHint>
          </BreakdownCard>

          <BreakdownHint>Tổng số bản ghi đang theo dõi: {total}</BreakdownHint>
        </Breakdown>
      </RatioBody>
    </RatioCard>
  );
};

export default function AdminDashboard() {
  const { data, isLoading } = useAdminDashboardQuery();

  if (isLoading) {
    return (
      <LoadingShell>
        <Skeleton active paragraph={{ rows: 8 }} />
      </LoadingShell>
    );
  }

  const dashboard = data ?? {
    totalUsers: 0,
    locations: {
      approvedCount: 0,
      pendingCount: 0,
      approvedPercentage: 0,
      pendingPercentage: 0,
    },
    reports: {
      approvedCount: 0,
      pendingCount: 0,
      approvedPercentage: 0,
      pendingPercentage: 0,
    },
  };

  return (
    <PageContainer breadcrumbItems={[{ title: "Tong quan he thong" }]} showBreadcrumb showNavButtons={false}>
      <DashboardStack>
        <HeroGrid>
          <HeroCard>
            <div>
              <HeroEyebrow>Admin Dashboard</HeroEyebrow>
              <HeroTitle>Toàn cảnh vận hành hệ thống P4WS</HeroTitle>
              <HeroSubTitle>
                Theo dõi nhanh quy mô người dùng, tiến độ duyệt địa điểm và trạng thái xử lý báo cáo từ
                một màn hình tổng hợp.
              </HeroSubTitle>
            </div>

            <MetricStrip>
              <MetricCard>
                <MetricLabel>Tổng người dùng</MetricLabel>
                <MetricValue>{dashboard.totalUsers}</MetricValue>
                <MetricHint>Tài khoản đang hoạt động hoặc bị khóa</MetricHint>
              </MetricCard>

              <MetricCard>
                <MetricLabel>Địa điểm đã duyệt</MetricLabel>
                <MetricValue>{dashboard.locations.approvedCount}</MetricValue>
                <MetricHint>{formatPercent(dashboard.locations.approvedPercentage)}</MetricHint>
              </MetricCard>

              <MetricCard>
                <MetricLabel>Báo cáo chờ duyệt</MetricLabel>
                <MetricValue>{dashboard.reports.pendingCount}</MetricValue>
                <MetricHint>{formatPercent(dashboard.reports.pendingPercentage)}</MetricHint>
              </MetricCard>
            </MetricStrip>
          </HeroCard>

          <HeroCard>
            <div>
              <HeroEyebrow>Điểm nhấn</HeroEyebrow>
              <HeroTitle style={{ fontSize: "2.4rem" }}>Nhịp xử lý hiện tại</HeroTitle>
              <HeroSubTitle>
                Hai cụm số liệu bên dưới thể hiện rõ tỷ lệ duyệt và chờ duyệt để admin nắm ngay khối lượng
                công việc cần xử lý.
              </HeroSubTitle>
            </div>

            <MetricStrip style={{ gridTemplateColumns: "1fr" }}>
              <MetricCard>
                <MetricLabel>Địa điểm chờ duyệt</MetricLabel>
                <MetricValue>{dashboard.locations.pendingCount}</MetricValue>
                <MetricHint>So với {dashboard.locations.approvedCount} địa điểm đã duyệt</MetricHint>
              </MetricCard>

              <MetricCard>
                <MetricLabel>Báo cáo đã duyệt</MetricLabel>
                <MetricValue>{dashboard.reports.approvedCount}</MetricValue>
                <MetricHint>So với {dashboard.reports.pendingCount} báo cáo chờ duyệt</MetricHint>
              </MetricCard>
            </MetricStrip>
          </HeroCard>
        </HeroGrid>

        <RatioGrid>
          <RatioPanel
            title="Tỷ lệ phê duyệt địa điểm"
            description="So sánh trực tiếp giữa số địa điểm đã được duyệt và số địa điểm còn đang chờ xử lý."
            ratio={dashboard.locations}
          />

          <RatioPanel
            title="Tỷ lệ xử lý báo cáo"
            description="Theo dõi tiến độ phê duyệt báo cáo vi phạm để ưu tiên các mục đang tồn đọng."
            ratio={dashboard.reports}
          />
        </RatioGrid>
      </DashboardStack>
    </PageContainer>
  );
}
