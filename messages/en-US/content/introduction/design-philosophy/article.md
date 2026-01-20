# Design Philosophy

Intor is designed to **avoid black-box behavior and unnecessary system invasiveness** as core principles,  
aiming to provide a translation core that remains consistent, inspectable,
and fully reasoned across different execution environments.

> Most i18n solutions rely on extensive config and deep framework coupling,  
> resulting in opaque translation flows that are difficult to reason about and hard to stabilize over time.

Intor is composed of several clearly defined core components,  
each with explicit responsibilities and strict boundaries, avoiding cross-layer coupling.

---

## Semantic Config Model

> Intor treats config as **static semantic input**, not as an instance.

Each config describes translation semantics only.  
It is environment-agnostic, carries no behavioral logic, and explicitly defines its scope.  
As a result, each config represents an isolated i18n domain rather than a global singleton.

Under this model, translation capabilities are composed based on the execution context,  
enabling the system to support:

- Multiple i18n domains coexisting within the same application
- Consistent behavior across different execution environments
- Elimination of implicit global state, preserving translation predictability and reasoning

This semantic model is valid in both build-time contexts (such as CLI, CI/CD, and SSG) and runtime environments, while relying on the same semantic config across execution phases.

> Avoiding a global singleton implies that translation-related capabilities must be provided explicitly at the appropriate execution stage.

---

## Translation Flow and Responsibility Boundaries

The lowest layer of translation logic is isolated as a pure semantic engine: `intor-translator`.  
It is responsible solely for translation semantics and remains unaware of execution environments, frameworks, or lifecycle concerns.

The Intor core is responsible for collecting and assembling the necessary translation context across different environments,
then delegating the translation task to the semantic engine and producing the final output.

The overall flow is intentionally kept unidirectional and easy to reason about:

> External execution environment → Intor assembles context → intor-translator performs translation → Intor outputs result
