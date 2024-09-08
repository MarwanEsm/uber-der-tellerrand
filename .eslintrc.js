module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'airbnb-typescript',
    ],
    plugins: ['@typescript-eslint', 'import'],
    rules: {
        // Your custom rules
        'import/extensions': ['error', 'ignorePackages', { js: 'never', ts: 'never', jsx: 'never', tsx: 'never' }],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
    settings: {
        'import/resolver': {
            typescript: {}, // This allows eslint to understand TypeScript path aliases
        },
    },
};
