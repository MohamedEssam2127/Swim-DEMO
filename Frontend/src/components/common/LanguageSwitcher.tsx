import { useLanguage, useTranslation } from "../../localization/i18n";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export default function LanguageSwitcher() {
  const { language, setLanguage, isRTL } = useLanguage();
  const { t } = useTranslation("common");
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);

  const isOwner = user?.role === "Owner";
  const isInventoryPage = location.pathname === "/inventory";

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const getPositionClasses = () => {
    if (isRTL) {
      return "left-5 bottom-24 lg:bottom-8";
    }
    if (isInventoryPage && isOwner) {
      return "right-11 bottom-48 lg:bottom-28";
    }
    return "right-5 bottom-24 lg:bottom-8";
  };

  return (
    <button
      onClick={toggleLanguage}
      aria-label={t("languageSwitcher.label")}
      title={t("languageSwitcher.label")}
      className={`fixed z-50 flex h-11 w-11 items-center justify-center bg-primary-500 hover:bg-primary-600 text-white font-bold text-xs tracking-wider rounded-sm cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 ${getPositionClasses()}`}
      style={{ fontFamily: language === "en" ? "'Noto Sans Arabic', sans-serif" : "'Inter', sans-serif" }}
    >
      {t("languageSwitcher.switchTo")}
    </button>
  );
}
