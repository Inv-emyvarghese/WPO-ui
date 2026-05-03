import { useTranslation } from "react-i18next";
import { AlertTriangle, Shield } from "lucide-react";

const titleColor = "#1D293D";
const descriptionColor = "#62748E";

const actionPillShadow =
  "0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10)";

export function ExecutiveOverviewEmptyState() {
  const { t } = useTranslation();
  const p = "dashboard.mapDetailTabs.emptyState";

  return (
    <div
      role="status"
      aria-live="polite"
      className="box-border flex w-full min-h-[360px] flex-col items-center justify-center rounded-none bg-transparent px-2 py-12 text-center sm:min-h-[420px] sm:py-14"
    >
      <div className="mb-2.5 box-border flex h-28 w-28 items-center justify-center rounded-full bg-white p-6 shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),0px_4px_6px_-1px_rgba(0,0,0,0.1)]">
        <Shield className="h-16 w-16" style={{ color: "#155DFC" }} aria-hidden />
      </div>
      <h2
        className="max-w-[640px] text-center text-[30px] font-bold leading-[36px] tracking-[0.396px]"
        style={{ color: titleColor, fontFamily: 'Inter, "Noto Sans JP", sans-serif' }}
      >
        {t(`${p}.title`)}
      </h2>
      <p
        className="mt-1.5 max-w-[600px] text-center text-[20px] font-normal leading-[32.5px] tracking-[-0.449px]"
        style={{ color: descriptionColor, fontFamily: 'Inter, "Noto Sans JP", sans-serif' }}
      >
        {t(`${p}.description`)}
      </p>
      <div
        className="mt-2.5 box-border flex h-10 w-max min-w-[286px] max-w-full shrink-0 items-center justify-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-4 py-2"
        style={{ boxShadow: actionPillShadow }}
      >
        <span className="flex shrink-0 leading-none" aria-hidden>
          <AlertTriangle className="h-5 w-5" style={{ color: "#FE9A00" }} aria-hidden />
        </span>
        <span className="min-w-0 shrink self-center whitespace-nowrap text-center text-[14px] font-normal leading-[20px] tracking-[-0.15px] text-[#90A1B9]">
          {t(`${p}.actionHint`)}
        </span>
      </div>
    </div>
  );
}