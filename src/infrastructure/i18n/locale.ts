//====== Constants ======

// Map
export const LOCALES_MAP = {
  EN_US: "en-US",
  ZH_TW: "zh-TW",
} as const;

// Array
export const LOCALES_ARRAY = Object.values(LOCALES_MAP);

// Default Locale
export const DEFAULT_LOCALE = LOCALES_MAP.EN_US;

// Display
export const LOCALE_DISPLAY = {
  [LOCALES_MAP.EN_US]: "English",
  [LOCALES_MAP.ZH_TW]: "中文",
};

//====== Types ======

// Type: Union literal
export type Locale = (typeof LOCALES_MAP)[keyof typeof LOCALES_MAP];
