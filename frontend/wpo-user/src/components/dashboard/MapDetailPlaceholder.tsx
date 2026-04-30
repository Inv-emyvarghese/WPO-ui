import { ParagraphLargeSize } from "@/constants/stringConstants";
import { Shield } from "lucide-react";

type Props = {
  message: string;
};

export function MapDetailPlaceholder({ message }: Readonly<Props>) {
  return (
    <div className="mt-1.5 box-border flex h-[189px] min-h-[189px] flex-col items-center justify-center gap-1.5 border-t border-[rgba(51,65,85,0.6)] bg-[rgba(15,23,42,0.35)] px-2 py-4 text-center">
      <Shield className="h-12 w-12" style={{ color: "#45556C" }} aria-hidden />
      <p
        className="text-[color:rgba(148,163,184,0.95)]"
        style={{ fontSize: ParagraphLargeSize }}
      >
        {message}
      </p>
    </div>
  );
}
