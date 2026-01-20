# Translator

The Translator is the core interface in Intor for accessing translation semantics.

---

## Translator Interface Contract

A Translator is provided by Intor in different execution environments and should not be created directly.  
In practice, it typically appears in one of the following forms:

- `useTranslator(...)`
- `getTranslator(...)`
- A translation interface returned or bound by `create*()`

Translator methods are accessed via `destructuring`, which defines the standard interface shape:

```ts ui=code-tabs hideHeader=true
---
title: none
---
const { t, hasKey } = useTranslator();
```

This interface shape is a defined convention in Intor and is relied upon by static analysis and tooling (such as the CLI).

## Methods

### hasKey()

Checks whether a given translation key exists.  
By default, the check is performed against the current locale, but a target locale can also be specified.

```ts ui=code-tabs hideHeader=true
---
title: none
---
// messages: { en: { hello: "Hello" }, fr: {} }

hasKey("hello"); // → true

hasKey("hello", "fr"); // → false
```

### t()

Resolves the given translation key and returns a string result.  
Interpolation can be applied via the second argument.

```ts ui=code-tabs hideHeader=true
---
title: none
---
// messages: { en: { hello: "Hello, {name}" } }

t("hello"); // → "Hello, {name}"

t("hello", { name: "Intor" }); // → "Hello, Intor"
```

### tRich()

Resolves the translation key while preserving its semantic structure, returning a composable result.  
The second argument provides structural mappings, and the third provides interpolation data; the concrete output form is determined by the execution environment.

```ts ui=code-tabs
---
title: React
---
// messages: { en: { hello: "Hello, <a>{name}</a>" } }

tRich("hello"); // → Hello, <a>{name}</a>

tRich("hello", { a: (children) => <a href="/">{children}</a> }, { name: "Intor" });
// → Hello, <a href="/">Intor</a>

---
title: Vue
---
// messages: { en: { hello: "Hello, <a>{name}</a>" } }

tRich("hello"); // → Hello, <a>{name}</a>

tRich("hello", { a: (children) => h("a", { href: "/" }, children) }, { name: "Intor" });
// → Hello, <a href="/">Intor</a>


---
title: Svelte
---
// messages: { en: { hello: "Hello, <a>{name}</a>" } }

{@html $tRich("hello")} // → Hello, <a>{name}</a>

{@html $tRich("hello", { a: (children) => `<a href="/">${children}</a>` }, { name: "Intor" })}
// → Hello, <a href="/">Intor</a>
```

> **Note**
> `tRich()` preserves the structural content of translations.  
> When using it, ensure that both translation content and interpolation data are trusted,
> and take appropriate care based on the rendering environment.
