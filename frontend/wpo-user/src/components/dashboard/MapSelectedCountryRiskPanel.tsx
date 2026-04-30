import { useTranslation } from "react-i18next";
import { useMemo, type ReactNode } from "react";
import {
  Activity,
  BadgeCheck,
  Ban,
  FileText,
  Gavel,
  Globe,
  Landmark,
  Layers,
  UserMinus,
} from "lucide-react";
import { CountryNameSize } from "@/constants/stringConstants";
import { getMapSelectedPanelScores } from "./mapSelectedCountryPanelMock";
import { RISK_COLORS, riskScoreToDisplayColor } from "./riskBuckets";
import { cx } from "@/utils/cx";

const cardClass =
  "box-border min-w-0 rounded-md border border-[rgba(71,85,105,0.55)] bg-[rgba(15,23,42,0.65)] p-3.5";

const sectionTitleClass =
  'font-[500] text-sm leading-5 tracking-[-0.15px] text-[#CAD5E2] [font-family:Inter,"Noto_Sans_JP",sans-serif]';

const listRowTextClass =
  'text-xs font-normal leading-4 text-[#90A1B9] [font-family:Inter,"Noto_Sans_JP",sans-serif]';

const scoreValueBase =
  'shrink-0 text-2xl font-bold leading-8 tracking-[0.07px] [font-family:Inter,"Noto_Sans_JP",sans-serif]';

type SubCardProps = {
  title: string;
  score: number;
  children: ReactNode;
};

function ScoreHeaderCard({ title, score, children }: Readonly<SubCardProps>) {
  return (
    <div className={cardClass}>
      <div className="flex flex-col items-start justify-between gap-1 sm:flex-row sm:items-center">
        <h3
          className={cx(
            sectionTitleClass,
            "pr-0 min-w-0 sm:pr-2 [flex:1_1_140px]"
          )}
        >
          {title}
        </h3>
        <span className={scoreValueBase} style={{ color: riskScoreToDisplayColor(score) }}>
          {score}
        </span>
      </div>
      {children}
    </div>
  );
}

const listIcon = (node: ReactNode) => <span className="inline-flex h-3 w-3 shrink-0 text-[#90A1B9]">{node}</span>;

const circle = (bg: string, icon: ReactNode) => (
  <div
    className="flex h-9 w-9 min-w-9 flex-shrink-0 items-center justify-center rounded-full"
    style={{ backgroundColor: bg }}
  >
    {icon}
  </div>
);

type Props = {
  countryId: string;
  countryName: string;
};

export function MapSelectedCountryRiskPanel({ countryId, countryName }: Readonly<Props>) {
  const { t } = useTranslation();
  const { regulatoryScore, nonComplianceScore } = useMemo(
    () => getMapSelectedPanelScores(countryId),
    [countryId]
  );
  const r = "dashboard.map.riskPanel";

  return (
    <section
      aria-label={t(`${r}.aria`, { name: countryName })}
      className="mt-1.5 box-border w-full min-w-0 border-t border-[rgba(51,65,85,0.6)] bg-[rgba(15,23,42,0.35)] px-0.5 pt-[18px] pb-0.5"
    >
      <h2
        className="mb-1.5 font-bold text-white"
        style={{ fontSize: CountryNameSize, lineHeight: 1.2 }}
      >
        {countryName}
      </h2>
      <div
        className="mb-[18px] h-px w-full"
        style={{ backgroundColor: "rgba(100, 116, 139, 0.45)" }}
      />

      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        <ScoreHeaderCard title={t(`${r}.regulatoryTitle`)} score={regulatoryScore}>
          <div className="mt-1.5 flex flex-col gap-1.25">
            <div className="flex items-center gap-1.25">
              {listIcon(<Gavel className="h-3 w-3" aria-hidden />)}
              <p className={listRowTextClass}>{t(`${r}.regulatory.a`)}</p>
            </div>
            <div className="flex items-center gap-1.25">
              {listIcon(<BadgeCheck className="h-3 w-3" aria-hidden />)}
              <p className={listRowTextClass}>{t(`${r}.regulatory.b`)}</p>
            </div>
          </div>
        </ScoreHeaderCard>

        <ScoreHeaderCard title={t(`${r}.nonComplianceTitle`)} score={nonComplianceScore}>
          <div className="mt-1.5 flex flex-col gap-1.25">
            <div className="flex items-center gap-1.25">
              {listIcon(<FileText className="h-3 w-3" aria-hidden />)}
              <p className={listRowTextClass}>{t(`${r}.nonCompliance.a`)}</p>
            </div>
            <div className="flex items-center gap-1.25">
              {listIcon(<Globe className="h-3 w-3" aria-hidden />)}
              <p className={listRowTextClass}>{t(`${r}.nonCompliance.b`)}</p>
            </div>
          </div>
        </ScoreHeaderCard>

        <div className={cardClass}>
          <h3
            className={cx(
              sectionTitleClass,
              "border-b border-[rgba(71,85,105,0.5)] pb-1.25"
            )}
          >
            {t(`${r}.factorsTitle`)}
          </h3>
          <div className="mt-1.5 flex flex-col gap-2.5 sm:flex-row">
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="flex items-center gap-1.25">
                {circle(
                  "#00C95033",
                  <Activity className="h-5 w-5" style={{ color: RISK_COLORS.low }} aria-hidden />
                )}
                <p className="text-sm text-white">{t(`${r}.factors.workload`)}</p>
              </div>
              <div className="flex items-center gap-1.25">
                {circle(
                  "rgba(244, 63, 94, 0.25)",
                  <Layers className="h-5 w-5" style={{ color: "#FB2C36" }} aria-hidden />
                )}
                <p className="text-sm text-white">{t(`${r}.factors.harassment`)}</p>
              </div>
              <div className="flex items-center gap-1.25">
                {circle(
                  "#00C95033",
                  <Activity className="h-5 w-5" style={{ color: RISK_COLORS.low }} aria-hidden />
                )}
                <p className="text-sm text-white">{t(`${r}.factors.jobInsecurity`)}</p>
              </div>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="flex items-center gap-1.25">
                {circle("rgba(244, 63, 94, 0.25)", (
                  <Ban className="h-5 w-5" style={{ color: RISK_COLORS.veryHigh }} aria-hidden />
                ))}
                <p className="text-sm text-white">{t(`${r}.factors.harassment`)}</p>
              </div>
              <div className="flex items-center gap-1.25">
                {circle("rgba(59, 130, 246, 0.22)", (
                  <Landmark className="h-5 w-5 text-[#60a5fa]" aria-hidden />
                ))}
                <p className="text-sm text-white">{t(`${r}.factors.jobInsecurity`)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={cardClass}>
          <h3
            className={cx(
              sectionTitleClass,
              "border-b border-[rgba(71,85,105,0.5)] pb-1.25"
            )}
          >
            {t(`${r}.consequencesTitle`)}
          </h3>
          <div className="mt-1.5 flex flex-col gap-1.25">
            {(
              [
                { k: "fines" as const, el: <Landmark className="h-5 w-5 text-[rgba(148,163,184,0.9)]" aria-hidden /> },
                { k: "legal" as const, el: <Gavel className="h-5 w-5 text-[rgba(148,163,184,0.9)]" aria-hidden /> },
                {
                  k: "absenteeism" as const,
                  el: (
                    <UserMinus className="h-5 w-5" style={{ color: RISK_COLORS.veryHigh }} aria-hidden />
                  ),
                },
              ] as const
            ).map((row) => (
              <div
                key={row.k}
                className="flex items-center gap-1.25 rounded py-[0.28rem] px-1.5"
                style={{ backgroundColor: "#3141584D" }}
              >
                {row.el}
                <p
                  className="text-sm font-normal leading-5 tracking-[-0.15px] text-[#CAD5E2]"
                  style={{ fontFamily: 'Inter, "Noto Sans JP", sans-serif' }}
                >
                  {t(`${r}.consequences.${row.k}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
