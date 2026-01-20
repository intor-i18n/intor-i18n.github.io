# Rich Translations

This page explains how Intor handles rich translation results in React,
allowing translations to include components and structure instead of plain strings.

---

## Why rich translations?

A regular translation function `t()` can only return a string, which makes it
impossible to insert components or structure into the translated result.

```ts ui=code-tabs hideHeader=true
---
title: none
---
// en.json
{ "doc": "Read the <link>doc</link>." }

t("doc");

// Rendered as a string
"Read the <link>doc</link>."
```

In a real UI, we usually want an output that can be directly composed into components:

```tsx ui=code-tabs hideHeader=true
---
title: none
---
<>
  Read the <a href="/doc">doc</a>.
</>
```

Rich translations are designed to handle this type of requirement.

## tRich()

`tRich()` is similar to `t()`, but returns a `ReactNode` instead of a string.

```tsx ui=code-tabs hideHeader=true
---
title: none
---
const { tRich } = useTranslator();

tRich("doc", {
  link: (children) => <a href="/doc">{children}</a>,
});
// Rendered as a ReactNode → Read the <a href="/doc">doc</a>.
```

Tags in the translation (such as `<link>`) are mapped to components at render time.

## <Trans />

`<Trans />` is the component-based form of `tRich()`, suitable for direct use in JSX.

```tsx ui=code-tabs hideHeader=true
---
title: none
---
<Trans
  i18nKey="doc"
  components={{
    link: (children) => <a href="/doc">{children}</a>,
  }}
/>
```

It provides the same capability as `tRich()`, with a different usage style.
