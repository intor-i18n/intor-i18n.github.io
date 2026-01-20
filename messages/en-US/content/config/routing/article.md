# Routing

Routing options define how locales and URL paths are resolved, normalized, and represented across inbound requests and outbound navigation.

---

## routing

Routing is conceptually defined in terms of structured **inbound** / **outbound** models.  
Intor also provides flat routing options as syntactic sugar, which are internally normalized into the same structured form.

### • basePath

The base path used for locale-aware routing.

> Defaults to `"/"`

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

Controls whether and how the locale appears as a path prefix in URLs.

> Defaults to `"none"` // "none" | "all" | "except-default"

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

The query parameter name used when resolving the locale from the URL.

> Defaults to `"locale"`

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

An ordered list of sources used to resolve the active locale (inbound).  
Sources are tried sequentially in the order provided.

> Defaults to `["path", "query", "cookie", "detected"]`  
> // ("path" | "host" | "query" | "cookie" | "detected")[]

### • firstVisit

`inbound.firstVisit`

Defines locale resolution behavior on the user’s first visit.

- **localeSource**：The locale source used on first visit.
  > Defaults to `"browser"` // "default" | "browser"
- **redirect**：Whether to perform a redirect after resolving the locale on first visit.
  > Defaults to `true`
- **persist**：Whether to persist the resolved locale from the first visit.
  > Defaults to `true`

### • localeCarrier

`outbound.localeCarrier`

Specifies how the locale is represented in navigation URLs.

> Defaults to `"path"` // "path" | "host" | "query"

### • host

`outbound.host`

Defines locale-to-host mappings when using host-based locale routing.

- **map**：A mapping table between locales and hostnames.
  > Defaults to `{}` // Record<string, string>
- **default**：The fallback hostname used when no locale mapping is found.
  > Defaults to `undefined` // string | undefined

### • forceFullReload

`outbound.forceFullReload`

Whether to force a full page reload when the active locale changes.

> Defaults to `false`
