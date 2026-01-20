# Translator

Translator 選項用於定義 Intor 中使用的翻譯顯示相關設定。

---

## translator

定義翻譯系統在特定狀態下的顯示訊息。

> 未設定時，預設顯示為翻譯 key。

### • loadingMessage

翻譯內容尚未就緒時所使用的顯示訊息。

```ts ui=code-tabs hideHeader=true
---
title: none
---
defineIntorConfig({
  translator: {
    loadingMessage: "Loading...",
  },
});
```

### • missingMessage

當翻譯 key 不存在或無法解析時所使用的顯示訊息。

```ts ui=code-tabs hideHeader=true
---
title: none
---
defineIntorConfig({
  translator: {
    missingMessage: "Translation not found",
  },
});
```
