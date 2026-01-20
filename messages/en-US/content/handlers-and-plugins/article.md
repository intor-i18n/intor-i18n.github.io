# Handlers & Plugins

Intor models translation as a reasoned, one-way semantic pipeline.  
Handlers and plugins correspond to different levels of intervention within this pipeline.

> Ordered Pipeline: resolveLocales → findMessage → **loading** → **missing** → **format** → interpolate

---

## Handlers

> Change how translations look.

Handlers are fixed-position, limited strategy exits in the semantic pipeline.  
Intor exposes handlers at exactly three predefined stages:

- loading → `LoadingHandler`
- missing → `MissingHandler`
- format → `FormatHandler`

Handlers do not participate in semantic resolution or decision-making.  
They return a final output value at their respective stage, and no further pipeline stages are evaluated.

---

## Plugins

> Change how translations work.

Plugins participate directly in semantic processing, they are inserted into the pipeline as hooks and executed in order based on their `order` value.  
Their behavior influences how translation results are produced, and is typically used for:

- pure rule-based key / locale transformation
- semantic normalization of translation input

Plugins must remain deterministic and reasoned.  
They must not introduce side effects, perform I/O, or depend on framework or runtime state.
