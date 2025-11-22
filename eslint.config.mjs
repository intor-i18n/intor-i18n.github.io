import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierPlugin from "eslint-plugin-prettier";
import { importConfig } from "./.config/eslint/import.mjs";
import { reactConfig } from "./.config/eslint/react.mjs";
import { typescriptConfig } from "./.config/eslint/typescript.mjs";
import { unicornConfig } from "./.config/eslint/unicorn.mjs";
import { unusedImportsConfig } from "./.config/eslint/unused-imports.mjs";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "ecosystem.config.js",
  ]),

  // JS
  js.configs.recommended,
  ...typescriptConfig,
  ...reactConfig,
  ...unicornConfig,
  ...importConfig,
  ...unusedImportsConfig,

  // Custom Function Rules
  { rules: { "func-style": ["warn", "expression"] } }, // Use arrow function (e.g., const fn = () => {})
  {
    files: [
      "./src/app/**/api/**/*.ts", // Off for API routes
      "./src/app/api/**/*.ts", // Off for API routes
      "./src/server/interfaces/actions/**/*.ts", // Off for Server actions
      "./src/**/*.tsx", // Off for JSX
    ],
    rules: { "func-style": "off" },
  },

  // Prettier
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    plugins: { prettier: prettierPlugin },
    rules: { "prettier/prettier": "warn" },
  },
]);

export default eslintConfig;
