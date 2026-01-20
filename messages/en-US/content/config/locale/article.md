# Locale

Locale options define the locale-related configuration used by Intor.

---

### • defaultLocale

The system’s default locale.

> `defaultLocale` also serves as the baseline locale for Intor during locale resolution and tooling operations (such as the CLI).

```ts ui=code-tabs hideHeader=true
---
title: none
---
defineIntorConfig({
  defaultLocale: "en",
});
```

### • supportedLocales

The list of locales explicitly supported by the system.

```ts ui=code-tabs hideHeader=true
---
title: none
---
defineIntorConfig({
  supportedLocales: ["en", "fr"],
});
```

### • fallbackLocales

Defines the locale mapping rules used to determine fallback locales when translation content for a given locale is unavailable.  
The fallback locale list for each locale is ordered.

> Using the string `"default"` in `fallbackLocales` represents the locale specified by `defaultLocale`.

```ts ui=code-tabs hideHeader=true
---
title: none
---
defineIntorConfig({
  fallbackLocales: {
    en: ["de", "fr"], // → ["de", "fr"]
    de: ["default"],  // → defaultLocale
  },
});
```
