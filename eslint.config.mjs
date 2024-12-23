import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    // Environment settings
    env: {
      browser: true,
      es2021: true,
    },
    // Plugins
    plugins: ["prettier"],
    // Custom rules
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  },
  // Extends equivalent configurations
  ...compat.extends(
    "next",
    "prettier",
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:prettier/recommended"
  ),
];

export default eslintConfig;
