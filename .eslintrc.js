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
        'plugin:prettier/recommended',  // Add this line
    ],
    plugins: ['@typescript-eslint', 'import', 'react', 'prettier'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'prettier/prettier': 'error', // Add this line to enforce Prettier rules
        'max-len': ['error', { code: 90 }],
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
