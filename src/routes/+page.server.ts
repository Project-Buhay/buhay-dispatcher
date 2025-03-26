import { parse } from 'valibot';

import { PUBLIC_WEBSOCKET_URL } from '$env/static/public';
import { Rescuers as RescuersSchema } from '$lib/models/rescuers.js';

export async function load({ fetch }) {
    const response = await fetch(`http://${PUBLIC_WEBSOCKET_URL}/get_rescuers`, { method: 'POST' });
    const raw_json = await response.json();
    const rescuers = parse(RescuersSchema, raw_json.rescuers);

    return { rescuers };
}
