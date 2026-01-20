# Messages

Messages options provide the static translation content used directly by Intor.

---

### • messages

Static translation content defined directly in the configuration.  
During system operation, this static content may be supplemented or overridden by subsequently loaded translation content.

```ts ui=code-tabs hideHeader=true
---
title: none
---
defineIntorConfig({
  messages: {
    en: {
      title: "Hello",
      description: "Welcome to Intor",
    },
    fr: {
      title: "Bonjour",
      description: "Bienvenue sur Intor",
    },
  },
});
```
