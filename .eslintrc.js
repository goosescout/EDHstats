module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'import'],
  extends: [
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:import/typescript',
  ],
  ignorePatterns: ['dist', '.eslintrc.js'],
  overrides: [
    {
      "files": ["src/app/store/slices/**/*.ts", "src/app/store/api/**/*.ts"],
      "rules": {
        "no-param-reassign": [
          "warn",
          { "props": true, "ignorePropertyModificationsFor": ["state"] }
        ]
      }
    }
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'camelcase': [
      'error',
      { 'properties': 'never', 'ignoreDestructuring': true }
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        'varsIgnorePattern': '^_',
        'argsIgnorePattern': '^_'
      }
    ],
    'no-param-reassign': [
      'error',
      {
        'props': true
      }
    ],
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        'groups': ['builtin', 'external', 'internal', 'sibling'],
        'pathGroups': [
          {
            'pattern': 'react',
            'group': 'builtin',
            'position': 'before'
          },
          {
            'pattern': '~/**',
            'group': 'internal',
            'position': 'before'
          },
          {
            'pattern': '@server/**',
            'group': 'internal',
            'position': 'before'
          },
          {
            'pattern': '@app/**',
            'group': 'internal',
            'position': 'before'
          },
          {
            'pattern': './*',
            'group': 'sibling',
            'position': 'after'
          }
        ],
        'pathGroupsExcludedImportTypes': ['react'],
        'newlines-between': 'always',
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true
        }
      }
    ],
    '@typescript-eslint/no-restricted-imports': [
      'error',
      {
        'patterns': [
          {
            'group': ['../*'],
            'message': 'No relative imports.'
          }
        ]
      }
    ]
  },
};
