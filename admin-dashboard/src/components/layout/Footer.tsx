const titleBold = "text-slate-700";
const textMuted = "text-slate-500";
const confidenceValue = "text-green-600";

const footerFontFamily =
  'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

function formatLastUpdated(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export type FooterProps = {
  /** Shown as “Last Updated: …” */
  lastUpdated?: Date;
  /** Bold green value after “Data Confidence:” */
  dataConfidenceValue?: string;
  /** Shown as “Version {version}” */
  version?: string;
};

export default function Footer({
  lastUpdated = new Date(2026, 0, 12),
  dataConfidenceValue = "Medium-High",
  version = "2.4",
}: Readonly<FooterProps>) {
  return (
    <footer
      style={{ fontFamily: footerFontFamily }}
      className="mt-20 box-border flex h-[69px] min-w-0 shrink-0 items-center justify-between gap-2 overflow-x-auto border-t border-[#eeeeee] bg-white px-4 text-sm sm:px-6"
    >
      <div className="flex min-w-0 flex-[0_1_auto] items-baseline gap-1">
        <span
          className={`truncate font-bold ${titleBold}`}
        >
          Psychosocial Risk Context Dashboard
        </span>
        <span className={`shrink-0 whitespace-nowrap font-normal ${textMuted}`}>
          © 2026
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-4 sm:gap-6">
        <span className={`whitespace-nowrap font-normal ${textMuted}`}>
          Last Updated: {formatLastUpdated(lastUpdated)}
        </span>
        <span className="whitespace-nowrap text-sm leading-snug">
          <span className={`font-normal ${textMuted}`}>Data Confidence: </span>
          <span className={`font-bold ${confidenceValue}`}>
            {dataConfidenceValue}
          </span>
        </span>
        <span className={`whitespace-nowrap font-normal ${textMuted}`}>
          Version {version}
        </span>
      </div>
    </footer>
  );
}
