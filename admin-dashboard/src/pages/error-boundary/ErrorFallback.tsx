import { ErrorIcon } from "@/components/icons/MuiIcons";
import { useTranslation } from "react-i18next";

export default function ErrorFallback() {
  const { t } = useTranslation();
  return (
    <div
      className="mt-12 flex justify-center px-4"
      role="alert"
    >
      <div className="w-full max-w-[460px] rounded-lg border border-slate-200 bg-white text-center shadow-md">
        <div className="px-6 py-10">
          <div className="mt-1 flex justify-center">
            <ErrorIcon className="size-[30px] text-red-600" />
          </div>

          <p className="mt-4 text-base font-medium text-slate-900">
            {t("errorBoundary.title")}
          </p>

          <p className="mt-2 text-sm text-slate-600">
            {t("errorBoundary.text")}
          </p>
        </div>
      </div>
    </div>
  );
}
