<script lang="ts">
    import { LogOut } from 'lucide-svelte';
</script>

<form method="POST">
    <button
        formaction="?/logout"
        class="m-4 h-12 w-12 rounded-full bg-buhay-red p-2 shadow-xl duration-300 ease-in-out hover:h-14 hover:w-14"
    >
        <LogOut class="h-full w-full text-warm-white" />
    </button>
</form>
