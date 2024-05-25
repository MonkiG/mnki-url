const globals = require('globals')
const love = require('eslint-config-love') 

module.exports = [
  {
    ...love,
    files: [
      "server/src/**/*.{ts,js}", 
      "server/lib/**/*.{ts.js}",
      "server/tests/**/*.{ts,js}",
    ],
    languageOptions: {
      parser: love.languageOptions.parser,
      parserOptions:{
        ...love.languageOptions.parserOptions.project,
        project: ["./server/tsconfig.development.json"]
      }
    },
    rules: {
      ...love.rules,
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-misused-promises": "off"
    },
  },
  {
    ...love,
    ignores: [
      "front/src/vite-env.d.ts"
    ],
    languageOptions: {
      ...love.languageOptions,
      globals: {
        ...globals.browser
      },
      parserOptions: {
        ...love.languageOptions.parserOptions,
        project: ["./front/tsconfig.json"]
      },
    },
    files: [
      "front/src/**/*.{ts,js,tsx,jsx}",
    ],
    rules: {
      ...love.rules,
    }
  }
]
