import { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typo from '@tailwindcss/typography';

export default {
    darkMode: 'selector',
    content: ['./src/**/*.{css,html,js,svelte,ts}'],
    theme: {
        colors: {
            'warm-white': '#E0E1E0',
            'blue-white': '#D7E6ED',
            'blue-neutral': '#32718E',
            blue: '#35ADBB',
            black: '#253242',
            gray: '#A6A6A6',
            'light-gray': '#F0F0F0',
            'dark-gray': '#323232',
            white: '#FFFFFF',
            transparent: '#00000000',
            'buhay-red': '#AD2121',
            'buhay-green': '#4CA682',
        },
        extend: {
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        '--tw-prose-body': theme('colors.csi-black'),
                        '--tw-prose-headings': theme('colors.csi-black'),
                        '--tw-prose-bullets': theme('colors.csi-black'),
                        '--tw-prose-invert-body': theme('colors.csi-white'),
                        '--tw-prose-invert-headings': theme('colors.csi-white'),
                        '--tw-prose-invert-bullets': theme('colors.csi-white'),
                    },
                },
            }),
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [forms, typo],
} satisfies Config;
