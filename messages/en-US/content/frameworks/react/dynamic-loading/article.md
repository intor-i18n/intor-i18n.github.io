# Dynamic Loading

This page demonstrates how to dynamically load translation messages with Intor  
in a React project when more flexible loading strategies are required.

---

> If you want to reduce the initial bundle size, or need to fetch the latest messages dynamically based on the active locale, you can defer message loading until runtime using dynamic loading.

This page continues from the [previous chapter](../react), reusing the same messages structure and overall setup.  
In this example, we switch to dynamic loading, so static `messages` are removed from the config.

```json ui=files
{
  "src": {
    "type": "folder",
    "children": {
      "intor-config.ts": {
        "type": "file",
        "gitStatus": "modified"
      }
    }
  }
}
```

```ts ui=code-tabs
---
title: src/intor-config.ts
---
export const intorConfig = defineIntorConfig({
  defaultLocale: "en",
  supportedLocales: ["en", "fr"],
});
```

---

## Dynamic Import

This approach uses the **bundler** (such as Vite) to dynamically import `messages` only when a specific locale is needed.

```json ui=files
{
  "src": {
    "type": "folder",
    "children": {
      "i18n-provider.tsx": {
        "type": "file",
        "gitStatus": "untracked"
      },
      "main.tsx": {
        "type": "file",
        "gitStatus": "modified"
      }
    }
  }
}
```

Messages are loaded through a custom `loader` function and managed inside a
dedicated `I18nProvider`.  
`useIntor` integrates locale state and loading logic, and passes the result to
`IntorProvider`.

```tsx ui=code-tabs
---
title: src/i18n-provider.tsx
---
import type { ReactNode } from "react";
import type { LocaleMessages } from "intor";
import { IntorProvider, useIntor } from "intor/react";
import { intorConfig } from "./intor-config.ts";

const loader = async (locale: string): Promise<LocaleMessages> => ({
  [locale]: (await import(`../messages/${locale}/index.json`)).default,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const value = useIntor(intorConfig, loader);
  return <IntorProvider value={value}>{children}</IntorProvider>;
}
```

```tsx ui=code-tabs
---
title: src/main.tsx
---
// ...
import { I18nProvider } from "./i18n-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
);
```

---

## Remote Fetch

This approach loads messages from a server via **HTTP requests**, fetching the corresponding `messages` dynamically when the locale changes.

```json ui=files
{
  "src": {
    "type": "folder",
    "children": {
      "i18n-provider.tsx": {
        "type": "file",
        "gitStatus": "untracked"
      },
      "main.tsx": {
        "type": "file",
        "gitStatus": "modified"
      }
    }
  }
}
```

Messages are fetched using a custom `loader` and managed within a dedicated
`I18nProvider`.  
`useIntor` coordinates locale state and loading logic, and provides the result
to `IntorProvider`.

```tsx ui=code-tabs
---
title: src/i18n-provider.tsx
---
import type { ReactNode } from "react";
import type { LocaleMessages } from "intor";
import { IntorProvider, useIntor } from "intor/react";
import { intorConfig } from "./intor-config.ts";

const loader = async (locale: string): Promise<LocaleMessages> => ({
  [locale]: await fetch(
    `http://localhost:5173/messages/${locale}/index.json`,
  ).then((r) => r.json()),
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const value = useIntor(intorConfig, loader);
  return <IntorProvider value={value}>{children}</IntorProvider>;
}
```

```tsx ui=code-tabs
---
title: src/main.tsx
---
// ...
import { I18nProvider } from "./i18n-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
);
```

---

## Notes

The examples above focus on core concepts and minimal implementations.  
In real-world applications, you may want to add error handling and other optimizations as needed.

---

## Next Steps

```tsx ui=card
---
title: Rich Translations
href: /frameworks/react/rich-translations
---
Render translations as React nodes,
allowing components and structure in messages.
```
