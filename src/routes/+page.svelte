<h1>Welcome to SvelteKit</h1>
<script>
    import { browser } from '$app/environment'
    import { page } from '$app/state'
  
    const socket = browser ? new WebSocket(`ws://buhay-backend-production.up.railway.app/ws/123`) : null
    
    let connected = $state(false)
    let message = $state('')
    socket?.addEventListener('open', () => (connected = true))
    socket?.addEventListener('close', () => (connected = false))
    socket?.addEventListener('message', () => (message = false))
  </script>
  
  <p>
    Websocket connection status: {connected ? '🟢' : '🔴'}
    Websocket message: {message ? {message} : '???'}
  </p>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
