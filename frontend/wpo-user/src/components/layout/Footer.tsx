import { cx } from "@/utils/cx";
import { Link } from "react-router-dom";

const titleBold = "#334155";
const textMuted = "#64748b";
const confidenceValue = "#16a34a";
const borderTop = "#eeeeee";

export type FooterProps = {
  lastUpdated?: Date;
  dataConfidenceValue?: string;
  version?: string;
};

function formatLastUpdated(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function Footer({
  lastUpdated = new Date(2026, 0, 12),
  dataConfidenceValue = "Medium-High",
  version = "2.4",
}: Readonly<FooterProps>) {
  return (
    <footer
      className={cx(
        "box-border flex h-[69px] min-w-0 shrink-0 items-center justify-between gap-2 overflow-x-auto border-t bg-white px-4 font-sans sm:px-6"
      )}
      style={{ borderTopColor: borderTop, borderTopWidth: 1, borderTopStyle: "solid" }}
    >
      <div className="flex min-w-0 flex-[0_1_auto] items-baseline gap-0.5">
        <span
          className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold leading-[1.3]"
          style={{ color: titleBold }}
        >
          Psychosocial Risk Context Dashboard
        </span>
        <span
          className="shrink-0 whitespace-nowrap text-sm font-normal leading-[1.3]"
          style={{ color: textMuted }}
        >
          © 2026
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
        <span
          className="whitespace-nowrap text-sm font-normal leading-[1.3]"
          style={{ color: textMuted }}
        >
          Last Updated: {formatLastUpdated(lastUpdated)}
        </span>
        <span className="whitespace-nowrap text-sm leading-[1.3]">
          <span className="font-normal" style={{ color: textMuted }}>
            Data Confidence:{" "}
          </span>
          <Link
            to="/psychosocial-dashboard#data-confidence"
            className="font-bold underline decoration-dotted underline-offset-2"
            style={{ color: confidenceValue }}
          >
            {dataConfidenceValue}
          </Link>
        </span>
        <span
          className="whitespace-nowrap text-sm font-normal leading-[1.3]"
          style={{ color: textMuted }}
        >
          Version {version}
        </span>
      </div>
    </footer>
  );
}
