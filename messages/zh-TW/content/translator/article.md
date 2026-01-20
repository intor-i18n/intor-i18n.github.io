# Translator

Translator 是 Intor 中用來存取翻譯語意的核心介面。

---

## Translator 介面約定

Translator 由 Intor 在不同執行環境中提供，不需要也不應被直接建立。  
實際上，Translator 通常會以下列形式出現：

- `useTranslator(...)`
- `getTranslator(...)`
- `create*()` 所回傳或綁定的翻譯介面

Translator 的方法以 **解構方式** 存取，作為標準介面形式：

```ts ui=code-tabs hideHeader=true
---
title: none
---
const { t, hasKey } = useTranslator();
```

此介面形式為 Intor 的既定約定，供靜態分析與工具鏈 (如 CLI) 使用。

## Methods

### hasKey()

檢查指定的翻譯 key 是否存在。  
預設以目前語系為準，亦可指定目標語系進行檢查。

```ts ui=code-tabs hideHeader=true
---
title: none
---
// messages: { en: { hello: "Hello" }, fr: {} }

hasKey("hello"); // → true

hasKey("hello", "fr"); // → false
```

### t()

解析指定的翻譯 key，並回傳字串結果。  
可透過第二參數提供插值資料（interpolation）。

```ts ui=code-tabs hideHeader=true
---
title: none
---
// messages: { en: { hello: "Hello, {name}" } }

t("hello"); // → "Hello, {name}"

t("hello", { name: "Intor" }); // → "Hello, Intor"
```

### tRich()

解析翻譯 key 並保留其語意結構，回傳可組合的翻譯結果。  
第二參數用於提供結構映射，第三參數用於提供插值資料；實際輸出形式由執行環境決定。

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
> `tRich()` 會保留翻譯內容的結構。  
> 使用時請確認翻譯內容與插值資料是否可信，並依渲染環境自行留意相關風險。
