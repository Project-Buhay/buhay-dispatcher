import { json } from '@sveltejs/kit';

import { PUBLIC_API_URL } from '$env/static/public';

export async function GET({ fetch, url }) {
    const request_id = url.searchParams.get('request_id');
    const rescuer_id = url.searchParams.get('rescuer_id');

    const updated = await fetch(`http://${PUBLIC_API_URL}/assign`, {
        method: 'POST',
        body: JSON.stringify({
            request_id: request_id,
            rescuer_id: rescuer_id,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    return json(updated);
}
