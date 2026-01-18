# Vite React

This page demonstrates the minimal integration flow of Intor in a Vite + React project.

> The following examples use TypeScript, but JavaScript is also supported.

---

## Installation

Create a Vite + React project by following the official guide: [Vite Documentation](https://vite.dev/guide/#scaffolding-your-first-vite-project)

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

Below is a minimal project structure example.  
Actual directories and naming can be adjusted based on your project needs.

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
          "en": {
            "type": "folder",
            "gitStatus": "untracked",
            "children": {
              "index.json": { "type": "file", "gitStatus": "untracked" }
            }
          },
          "fr": {
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
          "intor-config.ts": { "type": "file", "gitStatus": "untracked" },
          "App.tsx": { "type": "file", "gitStatus": "modified" },
          "main.tsx": { "type": "file", "gitStatus": "modified" }
        }
      }
    }
  }
}
```

## ♯1 Messages

Create a `messages` directory and organize message files by locale.  
Each locale provides an `index.json` file.

```json ui=files
{
  "messages": {
    "type": "folder",
    "gitStatus": "untracked",
    "children": {
      "en": {
        "type": "folder",
        "gitStatus": "untracked",
        "children": {
          "index.json": { "type": "file", "gitStatus": "untracked" }
        }
      },
      "fr": {
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
title: messages/en/index.json
---
{ "hello": "Hello" }

```

```json ui=code-tabs
---
title: messages/fr/index.json
---
{ "hello": "Bonjour" }
```

## ♯2 Intor Configuration

Create a shared configuration file `intorConfig` to define Intor’s core behavior.  
In this example, `messages` are imported directly using static imports.

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
import { defineIntorConfig } from "intor";
import EN from "../messages/en/index.json";
import FR from "../messages/fr/index.json";

export const intorConfig = defineIntorConfig({
  defaultLocale: "en",
  supportedLocales: ["en", "fr"],
  messages: {
    en: EN,
    fr: FR,
  },
});
```

## ♯3 Initialization

Use `IntorProvider` during application startup to inject configuration and locale.  
Intor provides `getClientLocale()` to automatically infer the initial locale.

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
import { IntorProvider, getClientLocale } from "intor/react";
import { intorConfig } from "./intor-config.ts";

const locale = getClientLocale(intorConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IntorProvider value={{ config: intorConfig, locale }}>
      <App />
    </IntorProvider>
  </StrictMode>,
);
```

---

## Usage Example

Below is a minimal example demonstrating basic Intor usage.  
Using `useTranslator`, you can access:

- `t`: retrieve messages based on the current locale
- `setLocale`: switch the active locale

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
      <h1>{t("hello")}</h1>

      <button onClick={() => setLocale("en")}>English</button>
      <button onClick={() => setLocale("fr")}>French</button>
    </>
  );
}

export default App;
```

---

## Next Steps

```tsx ui=card
---
title: Dynamic Loading
href: /frameworks/vite-react/dynamic-loading
---
When your project requires more flexible message loading strategies,
you can switch to dynamic loading.
```
