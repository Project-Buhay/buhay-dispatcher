import { websocket } from '@ubermanu/sveltekit-websocket/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import autoprefixer from 'autoprefixer';
import tailwind from 'tailwindcss';

export default defineConfig({
    plugins: [sveltekit(), websocket()],
    css: {
        postcss: {
            plugins: [tailwind, autoprefixer],
        },
    },
});
