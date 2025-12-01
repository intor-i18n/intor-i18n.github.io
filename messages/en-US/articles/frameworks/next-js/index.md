# Next.js

Quickly add Intor to your Next.js project to implement multi-language support, fully compatible with SSR and SSG. It provides flexible local or remote translation loaders and built-in routing integration.

> The following examples use TypeScript, but JavaScript is also supported.

---

## Installation

Before starting a Next.js project, make sure your environment is ready.  
If you haven’t created a project yet, refer to the official guide: [Next.js Documentation](https://nextjs.org/docs/app/getting-started/installation)

- This example project uses: `App Router`, `Tailwind CSS`, and `src/ directory`.

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
          "app": {
            "type": "folder",
            "gitStatus": "modified",
            "children": {
              "layout.tsx": { "type": "file", "gitStatus": "modified" },
              "page.tsx": { "type": "file", "gitStatus": "modified" }
            }
          },
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

### ♯2 Intor Configuration

Create a shared configuration file `intorConfig` to define Intor’s core behavior.  
In this example, we use the basic **Loader** mode: `local`, which loads messages from local static files.

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

export const intorConfig = defineIntorConfig({
  defaultLocale: "en-US",
  supportedLocales: ["en-US", "zh-TW"],
  loader: { type: "local" },
});
```

> You can adjust the file path or naming according to your preferences, e.g. src/i18n/config.ts.

### ♯3 Initialize Context

In a Next.js app, wrap your app with `IntorProvider` to provide the translation context.
Here, we initialize i18n data with `intor()` and `getI18nContext`:

- `intor`: server-side entry point, responsible for loading messages and caching results.
- `getI18nContext`: Next.js helper that parses the current locale and pathname.

```json ui=files
{
  "layout.tsx": {
    "type": "file",
    "gitStatus": "modified"
  }
}
```

```tsx ui=code-tabs
---
title: src/app/layout.tsx
---
// ...
import { intor } from "intor/server";
import { IntorProvider } from "intor/react";
import { getI18nContext } from "intor/next/server";
import { intorConfig } from "@/intor-config";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const value = await intor(intorConfig, getI18nContext);

  return (
    <html lang={value.initialLocale}>
      <body>
        <IntorProvider value={value}>{children}</IntorProvider>
      </body>
    </html>
  );
}
```

> Tip: You can customize how to get the I18nContext based on your project needs.

🎉 At this point, Intor is ready, and you can start using it in your application.

---

## Usage Example

Here’s a minimal `page.tsx` to quickly get started with Intor.

First, we use the `useTranslator` hook to get the translation function t:

- `t` (translate): used to translate text

Next, we use the Link component to switch locales:

- `Link`: a wrapped next/link. When the loader type is `local`, switching triggers a full page reload.

```json ui=files
{
  "page.tsx": {
    "type": "file",
    "gitStatus": "modified"
  }
}
```

```tsx ui=code-tabs
---
title: src/app/page.tsx
---
"use client";

import { useTranslator } from "intor/react";
import { Link } from "intor/next";

export default function Home() {
  const { t } = useTranslator();

  return (
    <div className="h-96 flex items-center justify-center flex-col">
      <h1>{t("greeting")}</h1>

      <div className="p-4 m-4 flex gap-2">
        <Link locale={"en-US"}>en-US</Link>
        <Link locale={"zh-TW"}>zh-TW</Link>
      </div>
    </div>
  );
}
```

---

## Additional Configuration

### ♯4 Routing

In a Next.js project, to **automatically handle multi-language routing**, you can use Intor’s `intorProxy` together with Next.js proxy to redirect users to the corresponding locale route without manually modifying URLs.

For more on Next.js Proxy, see: [Next.js Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/proxy)

> This example uses Next.js’s latest `proxy.ts` API. For older versions, use `middleware.ts`.

Updated structure:

```json ui=files
{
  "src": {
    "type": "folder",
    "gitStatus": "modified",
    "children": {
      "app": {
        "type": "folder",
        "gitStatus": "untracked",
        "children": {
          "[locale]": {
            "type": "folder",
            "gitStatus": "untracked",
            "children": {
              "page.tsx": { "type": "file", "gitStatus": "untracked" }
            }
          }
        }
      },
      "proxy.ts": {
        "type": "file",
        "gitStatus": "untracked"
      },
      "intor-config.ts": {
        "type": "file",
        "gitStatus": "modified"
      }
    }
  }
}
```

Create a dynamic `[locale]` folder with a `page.tsx` file.

The content of this `page.tsx` is the same as the usage example above: [Usage Example src/app/page.tsx](#usage-example)

```json ui=files
{
  "[locale]": {
    "type": "folder",
    "gitStatus": "untracked",
    "children": {
      "page.tsx": {
        "type": "file",
        "gitStatus": "untracked"
      }
    }
  }
}
```

Add `proxy.ts` to automatically redirect using `intorProxy`:

```json ui=files
{
  "proxy.ts": {
    "type": "file",
    "gitStatus": "untracked"
  }
}
```

```tsx ui=code-tabs
---
title: src/proxy.ts
---
import type { NextRequest } from "next/server";
import { intorProxy } from "intor/next/proxy";
import { intorConfig } from "@/intor-config";

export function proxy(request: NextRequest) {
  return intorProxy(intorConfig, request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
```

Update `intorConfig` to add `routing.prefix` to control automatic URL prefix behavior:

- `all`: prefix all locales
- `none`: no prefix
- `except-default`: only non-default locales get a prefix

```json ui=files
{
  "intor-config.ts": {
    "type": "file",
    "gitStatus": "modified"
  }
}
```

```tsx ui=code-tabs
---
title: src/intor-config.ts
---
 import { defineIntorConfig } from "intor/config";

export const intorConfig = defineIntorConfig({
  defaultLocale: "en-US",
  supportedLocales: ["en-US", "zh-TW"],
  loader: { type: "local" },
  routing: { prefix: "all" }, // add this line, default is `none`
});
```

After setup, visiting http://localhost:3000/ will redirect to `http://localhost:3000/{locale}`.  
Your app can now automatically handle multi-language routing and ensure correct navigation when switching locales. 💐

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
