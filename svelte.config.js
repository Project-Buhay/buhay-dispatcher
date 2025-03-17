import adapter from '@ubermanu/sveltekit-websocket';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */ 
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    extensions: ['.svelte', '.md'],

    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter(),
    },
};

export default config;
