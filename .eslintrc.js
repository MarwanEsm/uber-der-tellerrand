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
    ],
    plugins: ['@typescript-eslint', 'import', 'react'],
    rules: {
        // Disable the rule as it's not needed in React 17+
        'react/react-in-jsx-scope': 'off',
    },
    settings: {
        react: {
            version: 'detect', // Automatically detect the React version
        },
        'import/resolver': {
            typescript: {},
        },
    },
};
