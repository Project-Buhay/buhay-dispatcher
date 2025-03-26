import type { PageServerLoad, Actions } from './$types';
import { PUBLIC_WEBSOCKET_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
    const access_level = cookies.get('sessionid');
    return { access_level };
};
export const actions = {
    login: async ({ cookies, request, fetch }) => {
        const data = await request.formData();
        const user = data.get('user');
        const password = data.get('password');
        console.log(user);
        console.log(password);
        // if (!user) {
        // 	return fail(400, { user, missing: true });
        // } // UI checking na lang

        await fetch(`http://${PUBLIC_WEBSOCKET_URL}/login`, {
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
                //handle all redirects and setting cookies here
                console.log(json.person_id);
                if (json.person_id == '0') {
                    //let ui handle displaying 'wrong credentials'
                    console.log('wrong credentials');
                    return { success: false };
                }
                if (json.person_id == '2' || json.person_id == '1') {
                    redirect(303, 'redirect-login');
                    return { success: false };
                }

                if (json.person_id == '3') {
                    console.log(json.person_id);
                    cookies.set('sessionid', json.person_id, { path: '/' });
                    redirect(303, 'dashboard');
                    return { success: true };
                }
            });

        return { success: false };
    },
} satisfies Actions;
