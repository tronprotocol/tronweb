import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"),

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
            ...globals.mocha,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
    },

    rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
        "@typescript-eslint/no-explicit-any": "off",
    },
}, {
    files: ["**/.eslintrc.{js,cjs}"],

    languageOptions: {
        globals: {
            ...globals.node,
        },

        ecmaVersion: 5,
        sourceType: "commonjs",
    },
}, {
    files: ["./test/**"],

    languageOptions: {
        globals: {
            ...globals.node,
        },
    },

    rules: {
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-explicit-any": "off",
    },
}]);