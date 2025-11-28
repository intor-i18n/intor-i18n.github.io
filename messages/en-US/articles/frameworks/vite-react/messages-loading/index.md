# Messages Loading

This page demonstrates how to integrate language messages into Intor in a Vite + React project.  
We’ll showcase three common loading strategies: **Static Import**, **Dynamic Import**, and **Remote Fetch**, so you can choose the approach that best fits your needs.

---

## Three Common Methods

### Static Import

> Static Import is the simplest and most straightforward approach.

With static import, you simply include the language messages directly in your project, and Intor will immediately use them.  
See [Vite React ♯2 Intor Configuration](../vite-react#2-intor-configuration) for details.

```ts ui=code-tabs
---
title: src/intor-config.ts
---
import enUS from "../messages/en-US/index.json";
```

---

### Dynamic Import

> If you want to reduce the initial bundle size or load the latest messages on demand, consider using **Dynamic Import** to load `messages` based on the user’s locale.

In this example, we wrap `<App />` with an `I18nProvider` that manages the locale and corresponding messages, and provides `onLocaleChange` logic and an `isLoading` state.  
Place it in `main.tsx` to provide a global locale context to your app.

```json ui=files
{
  "src": {
    "type": "folder",
    "children": {
      "main.tsx": {
        "type": "file",
        "gitStatus": "modified"
      },
      "i18n-provider.tsx": {
        "type": "file",
        "gitStatus": "untracked"
      }
    }
  }
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
    <I18nProvider />
  </StrictMode>,
);
```

```tsx ui=code-tabs
---
title: src/i18n-provider.tsx
---
// ...
import App from "./App.tsx";
import { mergeMessages, type LocaleMessages } from "intor";
import { getInitialLocale, IntorProvider } from "intor/react";
import { intorConfig } from "./i18n-config.ts";

// Helper function: dynamically import messages for a specific locale
const importMessages = async (locale: string) => ({
  [locale]: (await import(`../messages/${locale}/index.json`)).default,
});

// Initialization: get default locale and load its messages
const initialLocale = getInitialLocale(intorConfig);
const initialMessages = await importMessages(initialLocale);

export function I18nProvider() {
  const [messages, setMessages] = useState<LocaleMessages>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <IntorProvider
      value={{
        config: intorConfig,
        initialLocale,
        // Merge dynamically loaded messages with the messages defined in config
        messages: mergeMessages(intorConfig.messages, messages),
        onLocaleChange: async (newLocale: string) => {
          setIsLoading(true);
          const loadedMessages = await importMessages(newLocale);
          setMessages(loadedMessages);
          setIsLoading(false);
        },
        isLoading,
      }}
    >
      <App />
    </IntorProvider>
  );
}
```

---

### Remote Fetch

> If you want to reduce the initial bundle size or dynamically fetch the latest messages, consider `Remote Fetch` to retrieve `messages` from a server based on the user’s locale.

In this example, we wrap `<App />` with an `I18nProvider` that manages the locale and corresponding messages, and provides `onLocaleChange` logic and an `isLoading` state.  
Place it in `main.tsx` to provide a global locale context to your app.

```json ui=files
{
  "src": {
    "type": "folder",
    "children": {
      "main.tsx": {
        "type": "file",
        "gitStatus": "modified"
      },
      "i18n-provider.tsx": {
        "type": "file",
        "gitStatus": "untracked"
      }
    }
  }
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
    <I18nProvider />
  </StrictMode>,
);
```

- In this example, we use the demo URL provided in the documentation: `https://intor-i18n.github.io/messages/${locale}/`.  
  The fetched data has the format: `{ greeting: string }`.

```tsx ui=code-tabs
---
title: src/i18n-provider.tsx
---
// ...
import App from "./App.tsx";
import { mergeMessages, type LocaleMessages } from "intor";
import { getInitialLocale, IntorProvider } from "intor/react";
import { intorConfig } from "./i18n-config.ts";

// Helper function: fetch messages for a specific locale
const fetchMessages = async (locale: string) => {
  return {
    [locale]: await fetch(
      `https://intor-i18n.github.io/messages/${locale}/`,
    ).then((r) => r.json()),
  };
};

// Initialization: get default locale and load its messages
const initialLocale = getInitialLocale(intorConfig);
const initialMessages = await fetchMessages(initialLocale);

export function I18nProvider() {
  const [messages, setMessages] = useState<LocaleMessages>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <IntorProvider
      value={{
        config: intorConfig,
        initialLocale,
        // Merge dynamically fetched messages with the messages defined in config
        messages: mergeMessages(intorConfig.messages, messages),
        onLocaleChange: async (newLocale: string) => {
          setIsLoading(true);
          const loadedMessages = await fetchMessages(newLocale);
          setMessages(loadedMessages);
          setIsLoading(false);
        },
        isLoading,
      }}
    >
      <App />
    </IntorProvider>
  );
}
```

You can also place your language files in the `public` folder of your Vite + React project, and use them as local test resources or remote assets:

```json ui=files
{
  "public": {
    "type": "folder",
    "gitStatus": "modified",
    "children": {
      "messages": {
        "type": "folder",
        "gitStatus": "untracked"
      }
    }
  }
}
```

```tsx ui=code-tabs
---
title: src/i18n-provider.tsx
---
// ...
const fetchMessages = async (locale: string) => {
  return {
    [locale]: await fetch(
      `http://localhost:5173/messages/${locale}/index.json`,
    ).then((r) => r.json()),
  };
};
// ...
```

---

## Notes

The above examples are simplified for demonstration purposes.  
In a real-world project, it is recommended to implement proper error handling, loading state management, and any necessary performance optimizations to ensure the application runs reliably under all conditions.

---

## Next Steps

```tsx ui=card
---
title: Translate Handlers
href: quick-start
---
Configure how the translator handles missing keys or displays messages while loading.
---

title: Type Generation & IntelliSense
href: quick-start
---
Automatically generate TypeScript types with `@intor/cli` for full IntelliSense support and type safety during development.
```
