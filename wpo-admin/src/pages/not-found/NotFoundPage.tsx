import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className="flex h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-slate-900">404</h1>

      <h2 className="mb-4 mt-2 text-2xl font-semibold text-slate-900">
        {t("pageNotFound.title")}
      </h2>

      <p className="mb-8 text-base text-slate-600">{t("pageNotFound.text")}</p>

      <Link
        to="/"
        className="inline-flex items-center gap-1 font-medium text-blue-600 hover:underline"
      >
        <ArrowLeft className="size-5" aria-hidden />
        {t("pageNotFound.link.back")}
      </Link>
    </div>
  );
}
