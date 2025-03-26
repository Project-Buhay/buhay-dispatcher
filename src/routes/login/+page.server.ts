import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

import { PUBLIC_API_URL } from '$env/static/public';

export function load({ cookies }) {
    const access_control = cookies.get('sessionid');
    return { access_control };
};

export const actions = {
    login: async ({ cookies, request, fetch }) => {
        const data = await request.formData();
        const user = data.get('user');
        const password = data.get('password');
        
        if (!user && !password) {
        	return { success: false };
        }

        await fetch(`http://${PUBLIC_API_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({
                username: user,
                password: password,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(json => {
                if (json.person_id == '2' || json.person_id == '1') {
                    redirect(303, '/redirect-login');
                }
                if (json.person_id == '3') {
                    cookies.set('sessionid', json.person_id, { path: '/' });
                    redirect(303, '/');
                }
            });

        return { success: false };
    },
} satisfies Actions;
