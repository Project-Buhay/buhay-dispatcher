import { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

export default {
    content: ['./src/**/*.{css,html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                background: 'var(--color-background)',
                foreground: 'var(--color-foreground)',

                invert: 'var(--color-invert)',
                'invert-foreground': 'var(--color-invert-foreground)',
            },
            typography: {
                DEFAULT: {
                    css: {
                        '--tw-prose-body': 'var(--color-foreground)',
                        '--tw-prose-headings': 'var(--color-foreground)',
                        '--tw-prose-bullets': 'var(--color-foreground)',
                    },
                },
            },
        },
    },
    plugins: [forms],
} satisfies Config;
