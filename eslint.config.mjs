import globals from "globals";
import pluginJs from "@eslint/js";
import jest from 'eslint-plugin-jest';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error"
    }
  },
  {
    files: ["/src/**/*.js"],
    languageOptions: { sourceType: "commonjs" }
  },
  {
    languageOptions: {
      globals:{
        ...globals.node
      }
    }
  },
  {
    files: ['/tests/**/*.js', '/**/*.test.js'], // Apply rules only to test files
    plugins: { jest },
    languageOptions: {
      globals: {
        ...jest.globals, // Recognize Jest globals
      },
    },
    rules: {
      ...jest.configs.recommended.rules, // Apply Jest's recommended rules
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/valid-expect': 'error',
    },
  }
];