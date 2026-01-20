# Locale

Locale 選項用於定義 Intor 中使用的語系相關設定。

---

### • defaultLocale

系統的預設語系。

> `defaultLocale` 同時作為 Intor 在語系解析與工具鏈 (如 CLI) 運作時的基準語系。

```ts ui=code-tabs hideHeader=true
---
title: none
---
defineIntorConfig({
  defaultLocale: "en",
});
```

### • supportedLocales

系統明確支援的語系列表。

```ts ui=code-tabs hideHeader=true
---
title: none
---
defineIntorConfig({
  supportedLocales: ["en", "fr"],
});
```

### • fallbackLocales

當指定語系的翻譯內容無法取得時，用於定義替代語系的對應規則。  
每個語系對應的替代語系列表具有順序性。

> 在 `fallbackLocales` 中使用字串 `"default"`，代表對應至 `defaultLocale` 所指定的語系。

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
