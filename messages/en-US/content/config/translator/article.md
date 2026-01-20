# Translator

Translator options define the translation display-related configuration used by Intor.

---

## translator

Defines the display messages used by the translation system in specific states.

> Defaults to the translation key when not specified.

### • loadingMessage

The display message used when translation content is not yet available.

```ts ui=code-tabs hideHeader=true
---
title: none
---
defineIntorConfig({
  translator: {
    loadingMessage: "Loading...",
  },
});
```

### • missingMessage

The display message used when a translation key does not exist or cannot be resolved.

```ts ui=code-tabs hideHeader=true
---
title: none
---
defineIntorConfig({
  translator: {
    missingMessage: "Translation not found",
  },
});
```
