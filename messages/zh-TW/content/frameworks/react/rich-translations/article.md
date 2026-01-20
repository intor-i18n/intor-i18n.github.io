# 可組合式翻譯

本頁介紹 Intor 在 React 中，如何處理可組合的翻譯結果，使翻譯內容能包含元件與結構，而不僅是字串。

---

## 為什麼需要可組合式翻譯？

一般的翻譯函式 `t()` 僅能回傳字串，因此無法在翻譯結果中插入元件或結構。

```ts ui=code-tabs hideHeader=true
---
title: none
---
// en.json
{ "doc": "Read the <link>doc</link>." }

t("doc");

// 輸出為純字串
"Read the <link>doc</link>."
```

在實際的 UI 中，我們通常希望輸出可直接組合成元件：

```tsx ui=code-tabs hideHeader=true
---
title: none
---
<>
  Read the <a href="/doc">doc</a>.
</>
```

可組合式翻譯用來解決這類需求。

## tRich()

`tRich()` 與 `t()` 類似，但回傳 `ReactNode` 而非字串。

```tsx ui=code-tabs hideHeader=true
---
title: none
---
const { tRich } = useTranslator();

tRich("doc", {
  link: (children) => <a href="/doc">{children}</a>,
});
// Rendered as ReactNode → Read the <a href="/doc">doc</a>.
```

翻譯內容中的 `<link>` 會在渲染階段被對應的元件取代。

## <Trans />

`<Trans />` 是 `tRich()` 的元件形式，適合直接在 JSX 中使用。

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

功能與 `tRich()` 相同，僅使用方式不同。
