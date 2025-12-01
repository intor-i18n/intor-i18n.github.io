# Vite React

This page shows the minimal setup for integrating Intor with Vite + React, including preparing message files, configuring Intor, and initializing the Context.  
These steps form the core usage pattern in typical front-end projects.

> The following examples use TypeScript, but JavaScript is also supported.

---

## Installation

Before starting a Vite + React project, make sure your environment is ready.  
If you haven’t created a project yet, refer to the official guide: [Vite Documentation](https://vite.dev/guide/#scaffolding-your-first-vite-project)

Install Intor:

```bash ui=code-tabs
---
title: npm
---
npm install intor

---
title: yarn
---
yarn add intor

---
title: pnpm
---
pnpm add intor

---
title: bun
---
bun add intor
```

---

## Project Structure

Here’s a minimal **Intor** setup example. You can adjust folder names and structure according to your project needs:

```json ui=files
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
        "gitStatus": "modified",
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

### ♯1 Language Files

Create a `messages` folder in your project, and create a subfolder for each locale.  
Each locale contains an `index.json` file:

```json ui=files
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

```json ui=code-tabs
---
title: messages/en-US/index.json
---
{
  "greeting": "Hello World"
}
```

```json ui=code-tabs
---
title: messages/zh-TW/index.json
---
{
  "greeting": "你好，世界"
}
```

> Tip: You can also use a simpler flat structure: `messages/en-US.json` / `messages/zh-TW.json`, depending on your preference.

### ♯2 Intor Configuration

Create a shared configuration file `intorConfig` to define Intor’s core behavior.  
In this example, we use **static imports** to load `messages`.

```json ui=files
{
  "intor-config.ts": {
    "type": "file",
    "gitStatus": "untracked"
  }
}
```

```ts ui=code-tabs
---
title: src/intor-config.ts
---
import { defineIntorConfig } from "intor/config";
import EN_US from "../messages/en-US/index.json";
import ZH_TW from "../messages/zh-TW/index.json";

export const intorConfig = defineIntorConfig({
  defaultLocale: "en-US",
  supportedLocales: ["en-US", "zh-TW"],
  messages: {
    "en-US": EN_US,
    "zh-TW": ZH_TW,
  },
});
```

> You can adjust the file path or naming according to your preferences, e.g. src/i18n/config.ts.

### ♯3 Initialize Context

Wrap `<App />` with `IntorProvider` to provide translation context.  
It is recommended to use Intor’s built-in `getInitialLocale()` to automatically detect the user’s `cookie` or `browser language`:

```json ui=files
{
  "main.tsx": {
    "type": "file",
    "gitStatus": "modified"
  }
}
```

```tsx ui=code-tabs
---
title: src/main.tsx
---
// ...
import { IntorProvider, getInitialLocale } from "intor/react";
import { intorConfig } from "./intor-config.ts";

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

- `t` (translate) used to translate text
- `setLocale` to switch the current locale

```json ui=files
{
  "App.tsx": {
    "type": "file",
    "gitStatus": "modified"
  }
}
```

```tsx ui=code-tabs
---
title: src/App.tsx
---
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

---

## Next Steps

```tsx ui=card
---
title: Messages Loading
href: /frameworks/vite-react/messages-loading
---
Use @intor/cli to automatically generate types and enjoy full IntelliSense support with strong type safety throughout your development workflow.

---
title: Type Generation & IntelliSense
href: /frameworks/vite-react/messages-loading
---
Use @intor/cli to automatically generate types and enjoy full IntelliSense support with strong type safety throughout your development workflow.
```
