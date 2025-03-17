import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';

export default ts.config(
    js.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs.recommended,
    ...svelte.configs.prettier,

    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    {
        files: ['**/*.svelte'],
        languageOptions: {
            parserOptions: {
                extraFileExtensions: ['.svelte'],
                parser: ts.parser,
            },
        },
        rules: {
            'svelte/no-at-html-tags': 'warn',
        },
    },
    {
        ignores: ['node_modules/**/*', '.svelte-kit/**/*', 'build/**/*'],
    },

    prettier,
);
