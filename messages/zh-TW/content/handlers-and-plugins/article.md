# Handlers & Plugins

Intor 將翻譯流程設計為一條可推理的單向語意管線。  
Handlers 與 Plugins 分別對應語意管線中不同層級的介入方式。

> Ordered Pipeline: resolveLocales → findMessage → **loading** → **missing** → **format** → interpolate

---

## Handlers

> 改變翻譯「看起來」的樣子。

Handlers 是翻譯語意管線中位置固定、數量有限的策略出口。  
Intor 僅在三個明確階段提供 handler：

- loading → `LoadingHandler`
- missing → `MissingHandler`
- format → `FormatHandler`

Handlers 不參與語意解析與決策，僅在對應階段回傳最終輸出值，並於此結束整個翻譯流程。

---

## Plugins

> 改變翻譯「怎麼運作」。

Plugins 直接參與翻譯語意的處理流程，以 pipeline hook 的形式插入管線中，並依 `order` 排序執行。  
其行為會影響翻譯結果的生成方式，可用於：

- 純規則的 key / locale 轉換
- 翻譯語意的正規化處理

Plugins 必須保持可推理且具決定性，不引入副作用、不進行 I/O，亦不依賴框架或 runtime 狀態。
