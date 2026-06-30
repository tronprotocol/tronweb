import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
    js.configs.recommended,
    {
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
            // TypeScript overrides for eslint:recommended (rules handled by the TS compiler)
            "constructor-super": "off",
            "getter-return": "off",
            "no-class-assign": "off",
            "no-const-assign": "off",
            "no-dupe-args": "off",
            "no-dupe-class-members": "off",
            "no-dupe-keys": "off",
            "no-func-assign": "off",
            "no-import-assign": "off",
            "no-new-symbol": "off",
            "no-new-native-nonconstructor": "off",
            "no-obj-calls": "off",
            "no-redeclare": "off",
            "no-setter-return": "off",
            "no-this-before-super": "off",
            "no-undef": "off",
            "no-unreachable": "off",
            "no-unsafe-negation": "off",
            "no-var": "error",
            "prefer-const": "error",
            "prefer-rest-params": "error",
            "prefer-spread": "error",

            // @typescript-eslint/recommended rules
            "@typescript-eslint/ban-ts-comment": "error",
            "no-array-constructor": "off",
            "@typescript-eslint/no-array-constructor": "error",
            "@typescript-eslint/no-duplicate-enum-values": "error",
            "@typescript-eslint/no-empty-object-type": "error",
            "@typescript-eslint/no-extra-non-null-assertion": "error",
            "@typescript-eslint/no-misused-new": "error",
            "@typescript-eslint/no-namespace": "error",
            "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
            "@typescript-eslint/no-require-imports": "error",
            "@typescript-eslint/no-this-alias": "error",
            "@typescript-eslint/no-unnecessary-type-constraint": "error",
            "@typescript-eslint/no-unsafe-declaration-merging": "error",
            "@typescript-eslint/no-unsafe-function-type": "error",
            "no-unused-expressions": "off",
            "@typescript-eslint/no-unused-expressions": "error",
            "@typescript-eslint/no-wrapper-object-types": "error",
            "@typescript-eslint/prefer-as-const": "error",
            "@typescript-eslint/prefer-namespace-keyword": "error",
            "@typescript-eslint/triple-slash-reference": "error",

            // Project-specific overrides
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
            "@typescript-eslint/no-explicit-any": "off",
        },
    },
    prettierConfig,
    {
        files: ["**/.eslintrc.{js,cjs}"],

        languageOptions: {
            globals: {
                ...globals.node,
            },

            ecmaVersion: 5,
            sourceType: "commonjs",
        },
    },
    {
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
    },
]);