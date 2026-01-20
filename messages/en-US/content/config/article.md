# Configuration

The configuration file defines Intor’s translation semantics as a static object.  
It serves as the most stable semantic foundation of the system and contains no executable logic.

> The configuration describes **what** the translation system is, not **how** it operates.

---

Below is a minimal configuration example illustrating the basic structure:

```ts ui=code-tabs hideHeader=true
---
title: none
---
import { defineIntorConfig } from "intor";

export const intorConfig = defineIntorConfig({
  defaultLocale: "en",
  supportedLocales: ["en", "fr"],
});
```

> It is recommended to define intorConfig in a dedicated file and export it as the only export.
> Avoid exporting additional values from the same file to ensure reliable static analysis and CLI detection.

## Overview

At the semantic level, an Intor configuration can be broadly divided into the following sections:

- [**Locale**](./config/locale): Defines the locales supported and used by the system.
- [**Messages**](#messages): Provides static translation content directly used by the system.
- [**Translator**](#translator): Configures display messages used during translation.
- [**Routing**](#routing): Defines how locales and paths are resolved and represented.
- [**Persistence**](#persistence): Defines how locale state is persisted across requests.
- [**Messages Loader**](#messages-loading): Defines how translation content is loaded.
- [**Observability**](#observability): Configures logging and diagnostic behavior.
