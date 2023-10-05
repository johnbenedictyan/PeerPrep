/* eslint-env node */
module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'airbnb-base', 'airbnb-typescript/base', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: './tsconfig.json',
    },
    plugins: ['@typescript-eslint'],
    root: true,
    overrides: [{
        files: ['*.test.ts'],
        rules: {
            '@typescript-eslint/no-var-requires': 'off',
        },
    }, ],
    rules: {
        "@typescript-eslint/no-explicit-any": "off", //Temp fix for any
    }
};