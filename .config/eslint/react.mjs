import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export const reactConfig = [
  {
    plugins: { react: reactPlugin, "react-hooks": reactHooksPlugin },
    files: ["**/*.tsx"],
    settings: { react: { version: "detect" } },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // React components start with "export function..."
      "react/function-component-definition": [
        "warn",
        {
          namedComponents: "function-declaration",
          unnamedComponents: "function-expression",
        },
      ],
    },
  },
];
