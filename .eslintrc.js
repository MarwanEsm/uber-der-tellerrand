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
        'plugin:react/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'airbnb-typescript',
        'prettier', // Ensure Prettier rules are extended
    ],
    plugins: ['@typescript-eslint', 'import', 'react', 'prettier'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'prettier/prettier': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    '**/*.test.{ts,tsx}', // Test files can import devDependencies
                    '**/setupTests.{ts,tsx}', // Setup files can import devDependencies
                ],
                optionalDependencies: false, // Ensure optional dependencies aren't imported by accident
                peerDependencies: false, // Ensure peer dependencies aren't imported by accident
            },
        ],
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            typescript: {}, // Ensure TypeScript imports are resolved
        },
    },
};
