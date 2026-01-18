## Note

### Config file requirements

Intor config files are loaded by tooling (e.g. `intor-cli`) via Node.js ESM import
during the discovery phase.

To ensure reliable config discovery:

- The config file **must only export Intor config objects**
- The config file **must not import runtime-heavy dependencies**
  (e.g. readers, parsers, framework code)
- The config file **must be side-effect free**

Violating these rules may cause the config to fail loading,
resulting in `No Intor config found` errors.
