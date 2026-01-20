# Messages

Messages 選項用於提供 Intor 直接使用的靜態翻譯內容。

---

### • messages

直接定義於設定檔中的靜態翻譯內容。  
在系統運作過程中，這些靜態內容可被後續載入的翻譯內容補充或覆蓋。

```ts ui=code-tabs hideHeader=true
---
title: none
---
defineIntorConfig({
  messages: {
    en: {
      title: "Hello",
      description: "Welcome to Intor",
    },
    fr: {
      title: "Bonjour",
      description: "Bienvenue sur Intor",
    },
  },
});
```
