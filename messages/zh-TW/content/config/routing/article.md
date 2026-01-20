# Routing

Routing 選項用於定義語系與 URL 路徑在請求進入與導覽輸出過程中的解析、正規化與表達方式。

---

## routing

Routing 在語意層級上由結構化的 **inbound** / **outbound** 模型組成。  
Intor 另提供 flat routing options 作為語法糖，並會在內部被正規化為對應的結構化模型。

### • basePath

語系路由所使用的基礎路徑。

> 預設為 `"/"`

```ts ui=code-tabs hideHeader=true
---
title: none
---
defineIntorConfig({
  routing: {
    basePath: "/admin",
  },
});
// Inbound: "/" → "/admin" (redirected when required)
```

### • localePrefix

控制語系是否以及如何作為路徑前綴出現在 URL 中。

> 預設為 `"none"` // "none" | "all" | "except-default"

```ts ui=code-tabs hideHeader=true
---
title: none
---
defineIntorConfig({
  routing: {
    localePrefix: "none",
  },
});
// Inbound (localePrefix: "none"): "/" → "/"
// Inbound (localePrefix: "all"): "/" → "/en" (redirected when required)
```

### • queryKey

`inbound.queryKey` | `outbound.queryKey`

當使用 query 作為語系來源時，所對應的查詢參數名稱。

> 預設為 `"locale"`

```ts ui=code-tabs hideHeader=true
---
title: none
---
defineIntorConfig({
  routing: {
    queryKey: "locale",
  },
});
// Inbound: "/?locale=en" → locale is "en"
```

### • localeSources

`inbound.localeSources`

用於解析目前語系的來源清單（inbound）。  
此清單具有順序性，會依序嘗試各來源。

> 預設為 `["path", "query", "cookie", "detected"]`  
> // ("path" | "host" | "query" | "cookie" | "detected")[]

### • firstVisit

`inbound.firstVisit`

定義使用者首次造訪時的語系解析行為。

- **localeSource**：首次造訪時所使用的語系來源。
  > 預設為 `"browser"` // "default" | "browser"
- **redirect**：是否在首次解析語系後進行重新導向。
  > 預設為 `true`
- **persist**：是否將首次解析的語系狀態保存。
  > 預設為 `true`

### • localeCarrier

`outbound.localeCarrier`

指定語系在導覽 URL 中所使用的承載形式。

> 預設為 `"path"` // "path" | "host" | "query"

### • host

`outbound.host`

定義以主機名稱作為語系承載方式時的對應關係。

- **map**：語系與主機名稱之間的對應表。
  > 預設為 `{}` // Record<string, string>
- **default**：當無對應語系時所使用的預設主機名稱。
  > 預設為 `undefined` // string | undefined

### • forceFullReload

`outbound.forceFullReload`

當語系發生變化時，是否強制觸發完整頁面重新載入。

> 預設為 `false`
