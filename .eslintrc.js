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
        'prettier' // Ensure Prettier rules are extended
    ],
    plugins: ['@typescript-eslint', 'import', 'react', 'prettier'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'prettier/prettier': 'off', // Turn off Prettier as an ESLint rule
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            typescript: {},
        },
    },
};
