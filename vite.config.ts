import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { websocket } from '@ubermanu/sveltekit-websocket/vite';

export default defineConfig({
    plugins: [sveltekit(), tailwindcss(), websocket()],
});
