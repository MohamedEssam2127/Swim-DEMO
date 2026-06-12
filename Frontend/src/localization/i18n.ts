import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import React from "react";

// ── Import all EN translation files ─────────────────────────────────────────
import enCommon from "./EN/common.json";
import enSignin from "./EN/signin.json";
import enSignup from "./EN/signup.json";
import enHome from "./EN/home.json";
import enInventory from "./EN/inventory.json";
import enOrder from "./EN/order.json";
import enHistory from "./EN/history.json";
import enStatistics from "./EN/statistics.json";
import enProfile from "./EN/profile.json";
import enReceipt from "./EN/receipt.json";
import enAuth from "./EN/auth.json";

// ── Import all AR translation files ─────────────────────────────────────────
import arCommon from "./AR/common.json";
import arSignin from "./AR/signin.json";
import arSignup from "./AR/signup.json";
import arHome from "./AR/home.json";
import arInventory from "./AR/inventory.json";
import arOrder from "./AR/order.json";
import arHistory from "./AR/history.json";
import arStatistics from "./AR/statistics.json";
import arProfile from "./AR/profile.json";
import arReceipt from "./AR/receipt.json";
import arAuth from "./AR/auth.json";

// ── Types ───────────────────────────────────────────────────────────────────
export type Language = "en" | "ar";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, namespace?: string) => string;
  dir: "ltr" | "rtl";
}

// ── Translation dictionaries ────────────────────────────────────────────────
const translations: Record<Language, Record<string, Record<string, unknown>>> = {
  en: {
    common: enCommon,
    signin: enSignin,
    signup: enSignup,
    home: enHome,
    inventory: enInventory,
    order: enOrder,
    history: enHistory,
    statistics: enStatistics,
    profile: enProfile,
    receipt: enReceipt,
    auth: enAuth,
  },
  ar: {
    common: arCommon,
    signin: arSignin,
    signup: arSignup,
    home: arHome,
    inventory: arInventory,
    order: arOrder,
    history: arHistory,
    statistics: arStatistics,
    profile: arProfile,
    receipt: arReceipt,
    auth: arAuth,
  },
};

// ── Helper: resolve nested key like "buttons.add" ───────────────────────────
function resolveKey(obj: Record<string, unknown>, key: string): string {
  const keys = key.split(".");
  let current: unknown = obj;
  for (const k of keys) {
    if (current && typeof current === "object" && k in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[k];
    } else {
      return key; // fallback to key itself
    }
  }
  return typeof current === "string" ? current : key;
}

// ── LocalStorage key ────────────────────────────────────────────────────────
const LANG_STORAGE_KEY = "swim-lang";

function getStoredLanguage(): Language {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === "ar" || stored === "en") return stored;
  } catch {
    // localStorage not available
  }
  return "en";
}

// ── Context ─────────────────────────────────────────────────────────────────
const I18nContext = createContext<I18nContextType | null>(null);

// ── Provider ────────────────────────────────────────────────────────────────
export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage);

  const applyDirection = useCallback((lang: Language) => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, []);

  useEffect(() => {
    applyDirection(language);
  }, [language, applyDirection]);

  const setLanguage = useCallback(
    (lang: Language) => {
      setLanguageState(lang);
      try {
        localStorage.setItem(LANG_STORAGE_KEY, lang);
      } catch {
        // localStorage not available
      }
      applyDirection(lang);
    },
    [applyDirection]
  );

  const t = useCallback(
    (key: string, namespace: string = "common"): string => {
      const nsData = translations[language]?.[namespace];
      if (nsData) {
        const result = resolveKey(nsData as Record<string, unknown>, key);
        if (result !== key) return result;
      }
      // Fallback: try common namespace
      if (namespace !== "common") {
        const commonData = translations[language]?.common;
        if (commonData) {
          const result = resolveKey(commonData as Record<string, unknown>, key);
          if (result !== key) return result;
        }
      }
      // Fallback: try English
      if (language !== "en") {
        const enNsData = translations.en?.[namespace];
        if (enNsData) {
          const result = resolveKey(enNsData as Record<string, unknown>, key);
          if (result !== key) return result;
        }
      }
      return key;
    },
    [language]
  );

  const dir = language === "ar" ? "rtl" : "ltr";

  const value: I18nContextType = { language, setLanguage, t, dir };

  return React.createElement(I18nContext.Provider, { value }, children);
}

// ── Hooks ───────────────────────────────────────────────────────────────────
export function useTranslation(namespace: string = "common") {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within I18nProvider");
  }

  const t = useCallback(
    (key: string, ns?: string) => context.t(key, ns ?? namespace),
    [context, namespace]
  );

  return { t, language: context.language, dir: context.dir };
}

export function useLanguage() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useLanguage must be used within I18nProvider");
  }
  return {
    language: context.language,
    setLanguage: context.setLanguage,
    dir: context.dir,
    isRTL: context.dir === "rtl",
  };
}
