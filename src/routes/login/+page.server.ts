import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { parse } from 'valibot';

import { PUBLIC_API_URL } from '$env/static/public';
import { LoginOutput as LoginOutputSchema } from '$lib/models/login_output';

export function load({ cookies }) {
    const access_control = cookies.get('sessionid');
    return { access_control };
}

export const actions = {
    default: async ({ cookies, request, fetch }) => {
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
                const { access_control } = parse(LoginOutputSchema, json);
                switch (access_control) {
                    case 1:
                    case 2:
                        redirect(303, '/redirect-login');
                        break;
                    case 3:
                        cookies.set('sessionid', access_control.toString(), { path: '/' });
                        redirect(303, '/');
                        break;
                }
            });

        return { success: false };
    },
} satisfies Actions;
