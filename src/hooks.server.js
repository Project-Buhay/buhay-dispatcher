/** @type {import('@ubermanu/sveltekit-websocket').HandleWebsocket} */
export function handleWebsocket({ socket }) {
    socket.on('message', () => {
        socket.send('');
    });
}
