# ICU Message Format

This page demonstrates the minimal setup for integrating ICU Message Format into Intor.

---

Intor does not provide a built-in ICU syntax.  
Instead, formatting responsibility is delegated to mature and standardized implementations.  
In this example, we use `intl-messageformat` as the ICU formatting engine.

Please refer to the [FormatJS official documentation](https://formatjs.github.io/docs/intl-messageformat).

## Installation

Install intl-messageformat：

```bash ui=code-tabs
---
title: npm
---
npm install intl-messageformat

---
title: yarn
---
yarn add intl-messageformat

---
title: pnpm
---
pnpm add intl-messageformat

---
title: bun
---
bun add intl-messageformat
```

## Format Handler

Since Intor already handles **interpolation** and **rich tags** internally, tag parsing must be disabled when using `IntlMessageFormat`.  
For details on handler design and behavior, see [Handlers & Plugins](./handlers-and-plugins).

Below is a minimal ICU format handler implementation:

```ts ui=code-tabs
---
title: icu-format-handler.ts
---
import type { FormatHandler, MessageValue } from "intor";
import IntlMessageFormat from "intl-messageformat";

export const icuFormatHandler: FormatHandler = ({
  rawMessage,
  locale,
  replacements,
}) => {
  const formatter = new IntlMessageFormat(
    rawMessage,
    locale,
    {},
    { ignoreTag: true }, // Disable tag parsing (handled by Intor)
  );
  return formatter.format(replacements) as MessageValue;
};
```

## Injecting the Handler

Register `icuFormatHandler` via the `handlers` option during initialization.

```tsx ui=code-tabs
---
title: React
---
import { IntorProvider } from "intor/react";
import { icuFormatHandler } from "./icu-format-handler.ts";

// ...
  <IntorProvider
    value={{ ...value, handlers: { formatHandler: icuFormatHandler } }}
  >
    {children}
  </IntorProvider>
// ...

---
title: Vue
---
import { IntorProvider } from "intor/vue";
import { icuFormatHandler } from "./icu-format-handler";

// ...
  <IntorProvider
    :value="{ ...value, handlers: { formatHandler: icuFormatHandler } }"
  >
    <HelloWorld />
  </IntorProvider>
// ...

---
title: Svelte
---
import { createIntorStore } from "intor/svelte";
import { icuFormatHandler } from "./icu-format-handler";

// ...
createIntorStore({
  ...value,
  handlers: { formatHandler: icuFormatHandler },
});
// ...
```

```tsx ui=code-tabs
---
title: Next.js (Server-side)
---
import { getTranslator } from "intor/next/server";
import { icuFormatHandler } from "./icu-format-handler";

// ...

getTranslator(intorConfig, {
  handlers: { formatHandler: icuFormatHandler },
});

// ...

---
title: Express
---
import { createIntor, getTranslator } from "intor/express";
import { icuFormatHandler } from "./icu-format-handler";

// Initialization phase
app.use(
    createIntor(intorConfig, { handlers: { formatHandler: icuFormatHandler } }),
);

// Translator acquisition phase
getTranslator(intorConfig, req, {
    handlers: { formatHandler: icuFormatHandler },
});
```

> **Note**  
> Intor adopts a design that combines static semantic config with runtime capability injection.  
> In request-scoped environments, translator-related dependencies are therefore provided explicitly at each stage.
>
> For the rationale behind this design, see [Design Philosophy](./introduction/design-philosophy).

## ICU Example

Below is a minimal example using ICU Message Format:

```ts ui=code-tabs
---
title: example.tsx
---
export const intorConfig = defineIntorConfig({
  defaultLocale: "en",
  supportedLocales: ["en", "fr"],
  messages: {
    en: { icu: "Price: {value, number, ::currency/USD}" },
    fr: { icu: "Price: {value, number, ::currency/EUR}" },
  },
});

// ...

<p>{t("icu", { value: 12.5 })}</p>
// en → Price: $12.50
// fr → Price: 12,50 €
```

> For detailed syntax, refer to [ICU Message syntax](https://formatjs.github.io/docs/core-concepts/icu-syntax)
