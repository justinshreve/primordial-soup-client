const BASE_EXTENDS = [
  'eslint:recommended',
  'plugin:@typescript-eslint/eslint-recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:import/recommended',
  'plugin:import/electron',
  'plugin:import/recommended',
  'plugin:import/typescript',
  'plugin:jsx-a11y/recommended',
  'plugin:react-hooks/recommended',
  'plugin:react/recommended',
  'plugin:react/jsx-runtime',
  'plugin:security/recommended',
  'plugin:import/electron',
  'prettier',
];

const BASE_RULES = {
  /**
   * We want to enable these rules! 🤞
   */

  /**
   * A bunch of TypeScript types that are probably misused.
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md
   */
  '@typescript-eslint/ban-types': 'warn',

  /**
   * Explicit module boundary types are probably good for a shared library.
   * For an app like redpop, the type system checks across boundaries and this is just noise.
   */
  '@typescript-eslint/explicit-module-boundary-types': 'off',

  // These jsx-a11y violations are preexisting.
  'jsx-a11y/accessible-emoji': 'warn',
  'jsx-a11y/alt-text': 'warn',
  'jsx-a11y/anchor-has-content': 'warn',
  'jsx-a11y/anchor-is-valid': 'warn',
  'jsx-a11y/aria-proptypes': 'warn',
  'jsx-a11y/click-events-have-key-events': 'warn',
  'jsx-a11y/interactive-supports-focus': 'warn',
  'jsx-a11y/label-has-associated-control': 'warn',
  'jsx-a11y/media-has-caption': 'warn',
  'jsx-a11y/no-autofocus': 'warn',
  'jsx-a11y/no-noninteractive-element-interactions': 'warn',
  'jsx-a11y/no-noninteractive-element-to-interactive-role': 'warn',
  'jsx-a11y/no-redundant-roles': 'warn',
  'jsx-a11y/tabindex-no-positive': 'warn',

  /** Pre-existing violations we can consider enabling. */
  'react/display-name': 'off',
  'react/jsx-no-target-blank': 'off',
  'react/no-children-prop': 'off',
  'react/no-unescaped-entities': 'off',
  'react/prop-types': 'off',
  'react/no-arrow-function-lifecycle': 'error',

  /**
   * This would be a good rule to enable. Often, our explicit type annotations are worse than
   * inferred obvious types.
   * Disabled initially because we have so many violations.
   */
  '@typescript-eslint/no-inferrable-types': [
    'warn',
    {
      ignoreParameters: true,
      ignoreProperties: true,
    },
  ],

  /**
   * We're using these but shouldn't!
   * Very dangerous, turns off TypeScript in some places:
   * eg: // @ts-ignore
   */
  '@typescript-eslint/ban-ts-comment': 'warn',

  /**
   * 🕵️ Custom ruleset ✨
   */
  'no-duplicate-imports': ['error', { includeExports: true }],
  'no-console': 'warn',

  // Disallow usage of confusing, error-prone globals
  'no-restricted-globals': ['error', /* ...disallowed */ 'length', 'find'],

  // Allow try { … } catch {}
  'no-empty': ['error', { allowEmptyCatch: true }],

  // Annoying recommended rule that bans common things like `{}.hasOwnProperty('foo')`
  'no-prototype-builtins': 'off',

  // Suggests using rest parameters instead of `arguments` https://eslint.org/docs/rules/prefer-rest-params
  'prefer-rest-params': 'error',

  // Suggests using spread syntax instead of `.apply()` https://eslint.org/docs/rules/prefer-spread
  'prefer-spread': 'error',

  // Ban `interface Foo {}`; Allow `interface Foo extends Bar {}`
  '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],

  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      // Allow using a Rest Property to "omit" properties from an object
      ignoreRestSiblings: true,
      // Flag args that appear after the last used argument
      args: 'after-used',
      // Prefix with `_` to allow unused args
      argsIgnorePattern: '^_',
    },
  ],

  // Reports funny business with exports, like repeated exports of names or defaults.
  // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/export.md
  'import/export': 'error',

  // We should explicitly depend on imported dependencies
  // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md
  'import/no-extraneous-dependencies': 'error',

  'import/no-named-as-default': 'warn', // This goes against the way we have our HOCs set up to test with Redux

  'import/order': [
    'error',
    {
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
      },
      pathGroups: [
        {
          pattern: '*.+(css|sass|scss)',
          patternOptions: { matchBase: true },
          group: 'unknown',
          position: 'after',
        },
      ],
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
        'type',
        'object',
        'unknown',
      ],
    },
  ],

  /**
   * File extensions.
   * ECMAScript Module spec (and Node.js) suggests we should use extensions (always).
   * TypeScript (as of 4.3) disallows extensions for .ts files (never).
   * This should tend towards `always`.
   */
  'import/extensions': [
    'warn',
    {
      js: 'never',
      jsx: 'never',

      // These extensions are required
      mjs: 'always',
      json: 'always',
      scss: 'always',

      // TypeScript extensions are disallowed
      ts: 'never',
      tsx: 'never',
    },
  ],

  'import/newline-after-import': ['error', { count: 1 }],

  /** Filenames convention */
  'filenames/match-regex': ['error', '^[.a-z0-9-]+$'],

  /**
   * Disable noisy rule with very obscure, uncommon exploit
   * @see https://github.com/nodesecurity/eslint-plugin-security/blob/master/docs/the-dangers-of-square-bracket-notation.md
   */
  'security/detect-object-injection': 'off',

  'no-restricted-imports': [
    'error',
    {
      paths: [
        {
          name: 'lodash',
          message: 'Please use a native alternative or one of our utilities.',
        },
      ],
      patterns: [],
    },
  ],
};

// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: BASE_EXTENDS,
  globals: {
    API: true, // defined in each webpack config seperately
    APP: true, // defined in config/webpack/{server,client}.base.mjs
    fetch: true, // We have isomorphic-fetch to enable this on the server
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'jsx-a11y',
    'react',
    'react-hooks',
    'security',
    'testing-library',
    'filenames',
  ],
  settings: {
    react: { version: 'detect' },
  },
  env: {
    commonjs: true,
    browser: true,
    es6: true,
    node: true,
  },
  rules: BASE_RULES,
};
