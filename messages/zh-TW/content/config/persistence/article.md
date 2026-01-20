# Persistence

Persistence 選項用於定義語系狀態在請求之間的保存方式。

---

> **Note**  
> 目前 Intor 僅提供以 cookie 作為語系狀態的保存媒介。  
> 此設計旨在提供一種簡單、可預期，且與執行環境高度相容的預設保存方式。

## cookie

定義語系狀態如何透過 cookie 進行保存。

### • persist

是否啟用 cookie 的寫入行為。

> 預設為 `true`

```ts ui=code-tabs hideHeader=true
---
title: none
---
defineIntorConfig({
  cookie: {
    persist: true,
  },
});
```

### • name

保存語系狀態的 cookie 名稱。

> 預設為 `"intor.locale"`

```ts ui=code-tabs hideHeader=true
---
title: none
---
defineIntorConfig({
  cookie: {
    name: "my-cookie-name",
  },
});
```

### • domain

cookie 的網域作用範圍。

> 預設為 `undefined`

### • path

cookie 的路徑作用範圍。

> 預設為 `"/"`

### • maxAge

cookie 的有效期限（以秒為單位）。

> 預設為 `60 * 60 * 24 * 365` （365 天）

### • httpOnly

是否限制 cookie 僅能由 HTTP(S) 存取。

> 預設為 `false`

### • secure

是否僅在安全連線（HTTPS）下傳送 cookie。

> 預設為 `process.env.NODE_ENV !== "development"`

### • sameSite

cookie 的 SameSite 策略。

> 預設為 `"lax"`
