import styled from "styled-components";

export const APPROVED_COLOR = "#2f855a";
export const PENDING_COLOR = "#d69e2e";

export const DashboardStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 1.6rem;
`;

export const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
  gap: 2rem;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const Surface = styled.section`
  border-radius: 2.4rem;
  border: 1px solid rgba(226, 232, 240, 0.9);
  background:
    radial-gradient(circle at top right, rgba(247, 196, 94, 0.18), transparent 34%),
    linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow: 0 18px 48px rgba(15, 23, 42, 0.06);
`;

export const HeroCard = styled(Surface)`
  padding: 2.6rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export const HeroEyebrow = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #b7791f;
`;

export const HeroTitle = styled.h1`
  margin: 0.6rem 0 0;
  font-size: 3rem;
  line-height: 1.12;
  color: #122033;
`;

export const HeroSubTitle = styled.p`
  margin: 0.8rem 0 0;
  max-width: 56rem;
  font-size: 1.45rem;
  line-height: 1.7;
  color: #526071;
`;

export const MetricStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.4rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const MetricCard = styled.div`
  border-radius: 1.8rem;
  padding: 1.6rem 1.8rem;
  background: #f8fbff;
  border: 1px solid rgba(203, 213, 225, 0.9);
`;

export const MetricLabel = styled.div`
  font-size: 1.25rem;
  color: #64748b;
`;

export const MetricValue = styled.div`
  margin-top: 0.6rem;
  font-size: 3.2rem;
  font-weight: 800;
  color: #0f172a;
`;

export const MetricHint = styled.div`
  margin-top: 0.6rem;
  font-size: 1.25rem;
  color: #516174;
`;

export const RatioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const RatioCard = styled(Surface)`
  padding: 2rem;
`;

export const RatioHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.2rem;
  margin-bottom: 1.8rem;
`;

export const RatioTitle = styled.h2`
  margin: 0;
  font-size: 2rem;
  color: #152234;
`;

export const RatioText = styled.p`
  margin: 0.6rem 0 0;
  font-size: 1.35rem;
  line-height: 1.6;
  color: #617286;
`;

export const RatioBody = styled.div`
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 2rem;
  align-items: center;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const DonutWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DonutSvg = styled.svg`
  width: 18rem;
  height: 18rem;
`;

export const DonutCenter = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

export const DonutValue = styled.div`
  font-size: 2.8rem;
  font-weight: 800;
  color: #111827;
`;

export const DonutLabel = styled.div`
  margin-top: 0.2rem;
  font-size: 1.2rem;
  color: #64748b;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const DonutHolder = styled.div`
  position: relative;
  width: 18rem;
  height: 18rem;
`;

export const Breakdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const BreakdownCard = styled.div`
  border-radius: 1.6rem;
  padding: 1.4rem 1.5rem;
  background: #f8fafc;
  border: 1px solid rgba(226, 232, 240, 0.95);
`;

export const BreakdownRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const BreakdownLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: #172334;
`;

export const Dot = styled.span<{ $color: string }>`
  width: 1rem;
  height: 1rem;
  border-radius: 999px;
  background: ${({ $color }) => $color};
  box-shadow: 0 0 0 0.4rem ${({ $color }) => `${$color}20`};
`;

export const BreakdownValue = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  color: #111827;
`;

export const ProgressTrack = styled.div`
  height: 1rem;
  border-radius: 999px;
  background: #e8edf3;
  overflow: hidden;
  margin-top: 1rem;
`;

export const ProgressFill = styled.div<{ $width: number; $color: string }>`
  width: ${({ $width }) => `${Math.max(0, Math.min(100, $width))}%`};
  height: 100%;
  border-radius: inherit;
  background: ${({ $color }) => $color};
`;

export const BreakdownHint = styled.div`
  margin-top: 0.8rem;
  font-size: 1.2rem;
  color: #64748b;
`;

export const LoadingShell = styled.div`
  padding: 1.6rem;
`;
