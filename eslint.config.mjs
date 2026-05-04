import eslintJs from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

export default tsEslint.config({
  files: ['src/**/*.ts'],
  ignores: ['dist', 'node_modules'],
  extends: [
    eslintJs.configs.recommended,
    ...tsEslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended
  ],
  languageOptions: {
    globals: {
      ...globals.node
    },
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname
    }
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-unsafe-argument': 'error'
  }
})
