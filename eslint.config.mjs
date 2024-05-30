import globals from "globals";


export default {
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    globals: {
      browser: 'readonly',
      es2021: 'readonly',
    },
  },
  rules: {
     "no-trailing-spaces": "error",
     "object-curly-spacing": ["error", "always"],
     "arrow-spacing": ["error", { "before": true, "after": true }]
  },
  ignores: ["dist"]
};