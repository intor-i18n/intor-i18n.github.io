# Persistence

Persistence options define how locale state is preserved across requests.

---

> **Note**  
> Currently, Intor provides cookie-based persistence as the only mechanism for preserving locale state.  
> This design aims to offer a simple, predictable, and highly environment-compatible default solution.

## cookie

Defines how locale state is persisted via cookies.

### • persist

Whether to enable writing the resolved locale state into a cookie.

> Defaults to `true`

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

The name of the cookie used to store locale state.

> Defaults to `"intor.locale"`

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

The domain scope of the cookie.

> Defaults to `undefined`

### • path

The path scope of the cookie.

> Defaults to `"/"`

### • maxAge

The cookie lifetime, in seconds.

> Defaults to `60 * 60 * 24 * 365` (365 days)

### • httpOnly

Whether to restrict the cookie to HTTP(S) access only.

> Defaults to `false`

### • secure

Whether the cookie is only sent over secure (HTTPS) connections.

> Defaults to `process.env.NODE_ENV !== "development"`

### • sameSite

The SameSite policy of the cookie.

> Defaults to `"lax"`
