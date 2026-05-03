import { useState, type MouseEvent, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  AlertTriangle,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  ExternalLink,
  Gavel,
  Info,
  Users,
} from "lucide-react";

const textPrimary = "#1e293b";
const accentBlue = "#3b82f6";
const cardBg = "#ffffff";
const borderSubtle = "rgba(148, 163, 184, 0.55)";
const iconBoxBg = "#DBEAFE";
const keyPointsBlue = "#2563eb";

const headerIconWrap = (icon: ReactNode) => (
  <div
    className="box-border flex h-9 w-9 min-w-[36px] items-center justify-center rounded-[10px] p-1"
    style={{ backgroundColor: iconBoxBg }}
  >
    <div
      className="flex h-5 w-5 shrink-0 items-center justify-center leading-none"
      style={{ color: accentBlue }}
    >
      {icon}
    </div>
  </div>
);

const calloutBlue = {
  bg: "#eff6ff",
  border: "#3b82f6",
  title: "#1d4ed8",
} as const;

const calloutOrange = {
  bg: "#fff7ed",
  border: "#f97316",
  title: "#c2410c",
} as const;

const calloutGreen = {
  bg: "#f0fdf4",
  border: "#22c55e",
  title: "#14532d",
  body: "#14532d",
} as const;

type RecAccordionProps = {
  id: 1 | 2 | 3;
  open: boolean;
  onToggle: () => void;
  sectionLabel: string;
  title: string;
  headerIcon: ReactNode;
  children: ReactNode;
};

function RecAccordionRow({
  id,
  open,
  onToggle,
  sectionLabel,
  title,
  headerIcon,
  children,
}: Readonly<RecAccordionProps>) {
  return (
    <div
      className="overflow-hidden rounded-[10px] border"
      style={{ backgroundColor: cardBg, borderColor: borderSubtle }}
    >
      <button
        type="button"
        id={`recommendation-accordion-header-${id}`}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`recommendation-accordion-panel-${id}`}
        className="w-full border-0 bg-white p-2 [font:inherit] [text-align:left] [cursor:pointer] flex items-center gap-1.5"
      >
        {headerIconWrap(headerIcon)}
        <div className="min-w-0 flex-1">
          <span className="mb-0.5 block text-xs font-medium leading-tight text-slate-500">
            {sectionLabel}
          </span>
          <span className="block text-[0.95rem] font-bold leading-tight sm:text-base" style={{ color: textPrimary }}>
            {title}
          </span>
        </div>
        <div className="flex shrink-0" style={{ color: accentBlue }}>
          {open ? (
            <ChevronDown className="h-5 w-5" aria-hidden />
          ) : (
            <ChevronRight className="h-5 w-5" aria-hidden />
          )}
        </div>
      </button>
      {open ? (
        <div
          id={`recommendation-accordion-panel-${id}`}
          role="region"
          aria-labelledby={`recommendation-accordion-header-${id}`}
          className="border-t px-2 pb-2 pt-0"
          style={{ borderColor: borderSubtle }}
        >
          <div className="pt-2">{children}</div>
        </div>
      ) : null}
    </div>
  );
}

export function ExecutiveRecommendationsSection() {
  const { t } = useTranslation();
  const p = "dashboard.mapDetailTabs.executiveOverviewContent.recommendations" as const;

  const [open, setOpen] = useState({ 1: true, 2: false, 3: false });
  const toggle = (k: 1 | 2 | 3) => {
    setOpen((s) => ({ ...s, [k]: !s[k] }));
  };

  const s1 = `${p}.section1` as const;
  const s2 = `${p}.section2` as const;
  const s3 = `${p}.section3` as const;

  const keyPointKeys6 = ["point0", "point1", "point2", "point3", "point4", "point5"] as const;

  const keyPointKeys7 = [...keyPointKeys6, "point6"] as const;

  const keyPointKeys8 = [...keyPointKeys7, "point7"] as const;

  const contextCallout = (sectionPrefix: string, isFirst: boolean) => (
    <div
      className="rounded-[10px] border p-3.5"
      style={{
        marginTop: isFirst ? 16 : 12,
        borderColor: calloutBlue.border,
        backgroundColor: calloutBlue.bg,
      }}
    >
      <div className="flex items-start gap-1.5">
        <Info className="mt-px h-5 w-5 shrink-0" style={{ color: accentBlue }} aria-hidden />
        <div>
          <p className="mb-0.5 text-sm font-bold leading-snug" style={{ color: calloutBlue.title }}>
            {t(`${sectionPrefix}.legalPrincipleTitle`)}
          </p>
          <p className="m-0 text-sm leading-relaxed text-slate-700">{t(`${sectionPrefix}.legalPrincipleBody`)}</p>
        </div>
      </div>
    </div>
  );

  const interactionCallout = (sectionPrefix: string, isFirst: boolean) => (
    <div
      className="rounded-[10px] border p-3.5"
      style={{
        marginTop: isFirst ? 16 : 12,
        borderColor: calloutOrange.border,
        backgroundColor: calloutOrange.bg,
      }}
    >
      <div className="flex items-start gap-1.5">
        <AlertTriangle
          className="mt-px h-5 w-5 shrink-0"
          style={{ color: "#F54900" }}
          aria-hidden
        />
        <div>
          <p className="mb-0.5 text-sm font-bold leading-snug" style={{ color: calloutOrange.title }}>
            {t(`${sectionPrefix}.complianceTitle`)}
          </p>
          <p className="m-0 text-sm leading-relaxed text-slate-700">{t(`${sectionPrefix}.complianceBody`)}</p>
        </div>
      </div>
    </div>
  );

  const hierarchyCallout = (sectionPrefix: string, isFirst: boolean) => (
    <div
      className="rounded-[10px] border p-3.5"
      style={{
        marginTop: isFirst ? 16 : 12,
        borderColor: calloutGreen.border,
        backgroundColor: calloutGreen.bg,
      }}
    >
      <div className="flex items-start gap-1.5">
        <div
          className="mt-px flex h-5 w-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#16a34a]"
          aria-hidden
        >
          <Check className="h-3.5 w-3.5 text-white" aria-hidden />
        </div>
        <div className="min-w-0">
          <p className="mb-0.5 text-sm font-bold leading-snug" style={{ color: calloutGreen.title }}>
            {t(`${sectionPrefix}.hierarchyTitle`)}
          </p>
          <p className="m-0 text-sm font-normal leading-relaxed" style={{ color: calloutGreen.body }}>
            {t(`${sectionPrefix}.hierarchyBody`)}
          </p>
        </div>
      </div>
    </div>
  );

  const renderIntroAndKeyPointsList = (sectionPrefix: string, pointKeys: readonly string[]) => (
    <>
      <p className="mb-2 m-0 text-sm leading-[1.7]" style={{ color: textPrimary }}>
        {t(`${sectionPrefix}.intro`)}
      </p>
      <div className="mb-1.5 flex items-center gap-0.75">
        <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: keyPointsBlue }} aria-hidden />
        <span className="text-[0.9375rem] font-bold" style={{ color: keyPointsBlue }}>
          {t(`${sectionPrefix}.keyPointsHeading`)}
        </span>
      </div>
      <ul className="m-0 list-none p-0">
        {pointKeys.map((k) => (
          <li key={k} className="relative mb-1.25 pl-9 text-sm leading-relaxed text-slate-700 last:mb-0">
            <span
              className="absolute left-0 top-[0.55em] h-[5px] w-[5px] rounded-full"
              style={{ backgroundColor: keyPointsBlue }}
              aria-hidden
            />
            {t(`${sectionPrefix}.keyPoints.${k}`)}
          </li>
        ))}
      </ul>
    </>
  );

  const renderIntroKeyPointsAndCallouts = (
    sectionPrefix: string,
    pointKeys: readonly string[],
    calloutOrder: "contextFirst" | "interactionFirst" = "contextFirst"
  ) => (
    <>
      {renderIntroAndKeyPointsList(sectionPrefix, pointKeys)}
      {calloutOrder === "contextFirst" ? (
        <>
          {contextCallout(sectionPrefix, true)}
          {interactionCallout(sectionPrefix, false)}
        </>
      ) : (
        <>
          {interactionCallout(sectionPrefix, true)}
          {contextCallout(sectionPrefix, false)}
        </>
      )}
    </>
  );

  const renderSection3Content = () => (
    <>
      {renderIntroAndKeyPointsList(s3, keyPointKeys8)}
      {hierarchyCallout(s3, true)}
      {contextCallout(s3, false)}
      {interactionCallout(s3, false)}
    </>
  );

  return (
    <div
    className="rounded-xl border p-2 sm:p-2.5 [box-shadow:0_1px_3px_rgba(15,23,42,0.06)]"      style={{ backgroundColor: cardBg, borderColor: borderSubtle }}
    >
      <h2 className="mb-2 text-[1.05rem] font-bold leading-tight sm:text-lg" style={{ color: textPrimary }}>
        {t(`${p}.title`)}
      </h2>

      <div className="mb-2 rounded-[10px] border border-blue-200 bg-blue-50 p-2">
        <div className="flex items-start gap-1.5">
          <Info className="mt-px h-5 w-5 shrink-0" style={{ color: accentBlue }} aria-hidden />
          <div>
            <p className="mb-0.75 text-[0.9375rem] font-bold leading-snug" style={{ color: textPrimary }}>
              {t(`${p}.nonDiagnosticTitle`)}
            </p>
            <p className="m-0 text-sm leading-relaxed text-slate-500">{t(`${p}.nonDiagnosticBody`)}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <RecAccordionRow
          id={1}
          open={open[1]}
          onToggle={() => toggle(1)}
          sectionLabel={t(`${s1}.label`)}
          title={t(`${s1}.title`)}
          headerIcon={<Gavel className="block h-5 w-5 shrink-0" aria-hidden />}
        >
          {renderIntroKeyPointsAndCallouts(s1, keyPointKeys6)}
        </RecAccordionRow>

        <RecAccordionRow
          id={2}
          open={open[2]}
          onToggle={() => toggle(2)}
          sectionLabel={t(`${s2}.label`)}
          title={t(`${s2}.title`)}
          headerIcon={
            <AlertTriangle
              className="block h-5 w-5 shrink-0"
              style={{ color: "#FE9A00" }}
              aria-hidden
            />
          }
        >
          {renderIntroKeyPointsAndCallouts(s2, keyPointKeys7, "interactionFirst")}
        </RecAccordionRow>

        <RecAccordionRow
          id={3}
          open={open[3]}
          onToggle={() => toggle(3)}
          sectionLabel={t(`${s3}.label`)}
          title={t(`${s3}.title`)}
          headerIcon={<ClipboardList className="block h-5 w-5 shrink-0" aria-hidden />}
        >
          {renderSection3Content()}
        </RecAccordionRow>
      </div>

      <div className="mt-2.5 w-full">
        <a
          href="#"
          className="font-inherit no-underline [color:inherit] flex w-full min-h-12 items-center justify-center gap-1 rounded-lg bg-[#1d63ff] px-2 py-[0.6rem] text-sm font-bold leading-tight text-white [box-shadow:none] hover:bg-[#1454e0] [text-transform:none] focus:outline-2 focus:outline-offset-2 focus:outline-[#1d63ff] sm:text-[0.95rem] sm:py-1.5"
          onClick={(e: MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
        >
          <span className="inline-flex w-8 shrink-0 justify-center" aria-hidden>
            <BookOpen className="h-6 w-6 text-inherit" aria-hidden />
          </span>
          <span className="min-w-0 flex-1 text-center">{t(`${p}.accessGuidance.buttonLabel`)}</span>
          <span className="inline-flex w-8 shrink-0 justify-center" aria-hidden>
            <ExternalLink className="h-5 w-5 text-inherit" aria-hidden />
          </span>
        </a>
        <p className="m-0 mt-1.25 px-0.5 text-center text-[0.8125rem] leading-normal text-slate-500">
          {t(`${p}.accessGuidance.subtext`)}
        </p>

        <div
          className="mt-2 flex items-start gap-1.5 rounded-lg border p-1.5 sm:p-2"
          style={{ backgroundColor: "#f0f4f8", borderColor: "rgba(148, 163, 184, 0.55)" }}
        >
          <Users className="mt-px h-7 w-7 shrink-0 text-slate-600" aria-hidden />
          <div className="min-w-0">
            <p className="mb-0.75 text-[0.9375rem] font-bold leading-snug" style={{ color: textPrimary }}>
              {t(`${p}.policyConsideration.title`)}
            </p>
            <p className="m-0 text-sm leading-relaxed text-slate-600">{t(`${p}.policyConsideration.body`)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
