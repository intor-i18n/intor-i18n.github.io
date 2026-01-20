# Observability

Observability options define how Intor integrates with logging and diagnostic mechanisms.

---

## logger

Defines the logger configuration used by Intor during execution.

> Intor uses Logry as the default logging implementation.  
> For detailed logger options and behavior definitions, please refer to: [Logry](https://github.com/yiming-liao/logry)

### • level

Sets the logging level of the logger.

> Defaults to `"warn"` // "silent" | "trace" | "debug" | "info" | "warn" | "error" | "fatal"

```ts ui=code-tabs hideHeader=true
---
title: none
---
defineIntorConfig({
  logger: {
    level: "debug",
  },
});
```

### • preset

Specifies a predefined logger configuration preset.

### • normalizeConfig

Defines normalization settings for log payloads.

### • formatConfig

Defines formatting settings for log output.

### • renderConfig

Defines rendering settings for log content.

### • printConfig

Defines output behavior settings for logging.
