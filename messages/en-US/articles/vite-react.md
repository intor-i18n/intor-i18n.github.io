# Vite React

In a Vite + React project, Intor provides a lightweight way to integrate multi-language support. It allows preloading translation content or dynamically splitting language resources while keeping performance and flexibility.

> The following examples use TypeScript, but JavaScript can also be used.

---

## Installation

Before starting a Vite + React project, make sure your environment is ready.  
If you haven’t created a project yet, refer to the official guide: [Vite Documentation](https://vite.dev/guide/#scaffolding-your-first-vite-project)

Install Intor:

```bash ui=CodeTabs
---label npm---
npm install intor

---label yarn---
yarn add intor

---label pnpm---
pnpm add intor

---label bun---
bun add intor
```

---

## Project Structure

Here’s a minimal **Intor** setup example. You can adjust folder names and structure according to your project needs:

```json ui=Files
{
  "myapp": {
    "isRoot": "true",
    "type": "folder",
    "children": {
      "messages": {
        "type": "folder",
        "gitStatus": "untracked",
        "children": {
          "en-US": {
            "type": "folder",
            "gitStatus": "untracked",
            "children": {
              "index.json": { "type": "file", "gitStatus": "untracked" }
            }
          },
          "zh-TW": {
            "type": "folder",
            "gitStatus": "untracked",
            "children": {
              "index.json": { "type": "file", "gitStatus": "untracked" }
            }
          }
        }
      },
      "src": {
        "type": "folder",
        "children": {
          "App.tsx": { "type": "file", "gitStatus": "modified" },
          "main.tsx": { "type": "file", "gitStatus": "modified" },
          "intor-config.ts": { "type": "file", "gitStatus": "untracked" }
        }
      }
    }
  }
}
```

### ♯1 Language Files (Messages)

Create a `messages` folder in your project, and create a subfolder for each locale.  
Each locale contains an `index.json` file:

```json ui=Files
{
  "messages": {
    "type": "folder",
    "gitStatus": "untracked",
    "children": {
      "en-US": {
        "type": "folder",
        "gitStatus": "untracked",
        "children": {
          "index.json": { "type": "file", "gitStatus": "untracked" }
        }
      },
      "zh-TW": {
        "type": "folder",
        "gitStatus": "untracked",
        "children": {
          "index.json": { "type": "file", "gitStatus": "untracked" }
        }
      }
    }
  }
}
```

```json ui=CodeTabs
---label messages/en-US/index.json---
{
  "greeting": "Hello World"
}
```

```json ui=CodeTabs
---label messages/zh-TW/index.json---
{
  "greeting": "你好，世界"
}
```

> Tip: You can also use a simpler flat structure: `messages/en-US.json` / `messages/zh-TW.json`, depending on your preference.

### ♯2 Intor Configuration

Create a global configuration file `intorConfig` and statically import `messages`:

```json ui=Files
{
  "intor-config.ts": {
    "type": "file",
    "gitStatus": "untracked"
  }
}
```

```ts ui=CodeTabs
---label src/intor-config.ts---
import { defineIntorConfig } from "intor/config";
import enUS from "../messages/en-US/index.json";
import zhTW from "../messages/zh-TW/index.json";

export const intorConfig = defineIntorConfig({
  defaultLocale: "en-US",
  messages: {
    "en-US": enUS,
    "zh-TW": zhTW,
  },
});
```

> You can adjust the file path or naming according to your preferences, e.g. src/i18n/config.ts.

### ♯3 Initialize Context

Wrap `<App />` with `IntorProvider` to provide translation context.  
It is recommended to use Intor’s built-in `getInitialLocale()` to automatically detect the user’s `cookie` or `browser language`:

```json ui=Files
{
  "main.tsx": {
    "type": "file",
    "gitStatus": "modified"
  }
}
```

```ts ui=CodeTabs
---label src/main.tsx---
// ...
import { IntorProvider, getInitialLocale } from "intor/react";
import { intorConfig } from "./i18n-config.ts";

const initialLocale = getInitialLocale(intorConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IntorProvider value={{ config: intorConfig, initialLocale }}>
      <App />
    </IntorProvider>
  </StrictMode>,
);
```

> Tip: You can also implement your own logic to determine initialLocale depending on your project requirements.

🎉 At this point, Intor is ready, and you can start using it in your application.

---

## Usage Example

Here’s a minimal` <App />` example to quickly demonstrate the core usage of **Intor**.  
With the `useTranslator` hook, you can access:

- `t` (translate) to get translated text
- `setLocale` to switch the current locale

```json ui=Files
{
  "App.tsx": {
    "type": "file",
    "gitStatus": "modified"
  }
}
```

```tsx ui=CodeTabs
---label src/App.tsx---
// ...
import { useTranslator } from "intor/react";

function App() {
  const { t, setLocale } = useTranslator();

  return (
    <>
      <h1>{t("greeting")}</h1>

      <div style={{ display: "flex", gap: "12px" }}>
        <button onClick={() => setLocale("en-US")}>English</button>
        <button onClick={() => setLocale("zh-TW")}>繁體中文</button>
      </div>
    </>
  );
}

export default App;
```

Next, we will explain the two ways of loading `messages` based on project requirements.

---

## Message Loading Methods

### Static Import

> Static import is the simplest and most straightforward approach.

As demonstrated in the previous steps, we have already completed the static import of all `messages` into the project configuration.  
Refer to #2 Intor Configuration [♯2 Intor Configuration](#2-intor-configuration).

```ts ui=CodeTabs
---label src/intor-config.ts---
import enUS from "../messages/en-US/index.json";
```

### Dynamic Import by Locale

> If your messages are large or you want to reduce the initial bundle size, consider using dynamic import to load messages by locale.

We can create a dedicated `I18nProvider` component to wrap `<App />`, which:

- Loads messages for the current locale on initialization
- Updates messages dynamically when switching locales without reloading the page

You need to use this `I18nProvider` in `main.tsx` to provide a global locale context to your application.

```json ui=Files
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

```tsx ui=CodeTabs
---label src/main.tsx---
// ...
import { I18nProvider } from "./i18n-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider />
  </StrictMode>,
);
```

```tsx ui=CodeTabs
---label src/i18n-provider.tsx---
// ...
import App from "./App.tsx";
import { mergeMessages, type LocaleMessages } from "intor";
import { getInitialLocale, IntorProvider } from "intor/react";
import { intorConfig } from "./i18n-config.ts";

// Dynamically load messages for the specified locale
const importMessages = async (locale: string) => ({
  [locale]: (await import(`../messages/${locale}/index.json`)).default,
});

// Initialize locale and load corresponding messages
const initialLocale = getInitialLocale(intorConfig);
const initialMessages = await importMessages(initialLocale);

export function I18nProvider() {
  // Store and manage the current messages
  const [messages, setMessages] = useState<LocaleMessages>(
    mergeMessages(intorConfig.messages, initialMessages),
  );

  return (
    <IntorProvider
      value={{
        config: intorConfig,
        initialLocale,
        messages: mergeMessages(intorConfig.messages, messages),
        onLocaleChange: async (newLocale: string) => {
          const loadedMessages = await importMessages(newLocale);
          setMessages(mergeMessages(intorConfig.messages, loadedMessages));
        },
      }}
    >
      <App />
    </IntorProvider>
  );
}
```

---

## Next Steps

1. Type generation
