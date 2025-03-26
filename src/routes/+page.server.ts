import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { parse } from 'valibot';

import { PUBLIC_API_URL } from '$env/static/public';
import { Rescuers as RescuersSchema } from '$lib/models/rescuers.js';

export async function load({ cookies, fetch }) {
    const access_control = cookies.get('sessionid');

    if (access_control !== '3') {
        redirect(307, '/login');
    }

    const response = await fetch(`http://${PUBLIC_API_URL}/get_rescuers`, { method: 'POST' });
    const raw_json = await response.json();
    const rescuers = parse(RescuersSchema, raw_json.rescuers);

    return { rescuers };
}

export const actions = {
    logout: ({ cookies }) => {
        cookies.set('sessionid', '', { path: '/' });
    },
} satisfies Actions;
