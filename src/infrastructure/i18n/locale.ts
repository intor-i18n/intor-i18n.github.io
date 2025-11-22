//====== Constants ======

// Map
export const LOCALES_MAP = {
  EnUS: "en-US",
  ZhTW: "zh-TW",
} as const;

// Array
export const LOCALES_ARRAY = Object.values(LOCALES_MAP);

// Default Locale
export const DEFAULT_LOCALE = LOCALES_MAP.EnUS;

// Display
export const LOCALE_DISPLAY = {
  [LOCALES_MAP.EnUS]: "English",
  [LOCALES_MAP.ZhTW]: "中文",
};

export const LOCALE_PARAMS = LOCALES_ARRAY.map((locale) => ({ locale }));

//====== Types ======

// Type: Union literal
export type Locale = (typeof LOCALES_MAP)[keyof typeof LOCALES_MAP];

export type LocaleParams = (typeof LOCALE_PARAMS)[number];
