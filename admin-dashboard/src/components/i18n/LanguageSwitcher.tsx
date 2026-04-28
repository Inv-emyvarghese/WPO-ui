import i18n from "@/i18n";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDropDownIcon,
  PublicIcon,
} from "@/components/icons/MuiIcons";

type LanguageOption = {
  label: string;
  value: string;
};

const languages: LanguageOption[] = [
  { label: "日本語", value: "jp" },
  { label: "English", value: "en" },
];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState(i18n.language);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const handleChangeLanguage = (lang: LanguageOption) => {
    i18n.changeLanguage(lang.value);
    setLanguage(lang.value);
    setOpen(false);
  };

  const currentLabel =
    languages.find((item) => item.value === language)?.label || "Language";

  return (
    <div ref={rootRef} className="relative inline-block text-inherit">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center rounded-md p-2 text-inherit hover:bg-black/5"
      >
        <PublicIcon className="mr-2 size-5 shrink-0" data-testid="language-switcher" />
        <span className="text-sm">{currentLabel}</span>
        <ArrowDropDownIcon className="size-6 shrink-0" />
      </button>

      {open && (
        <ul
          className="absolute right-0 z-50 mt-1 min-w-[140px] rounded-md border border-slate-200 bg-white py-1 shadow-lg"
          role="menu"
        >
          {languages.map((lang, index) => (
            <li
              key={lang.value}
              role="none"
              className={index > 0 ? "border-t border-slate-200" : ""}
            >
              <button
                type="button"
                role="menuitem"
                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100"
                onClick={() => handleChangeLanguage(lang)}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
