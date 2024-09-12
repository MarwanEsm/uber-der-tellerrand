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
        'react/react-in-jsx-scope': 'off',
        'max-len': ['error', { code: 90 }], // Sets max line length to 80 characters
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
