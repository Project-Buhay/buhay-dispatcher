<script lang="ts">
    import { LogOut } from "lucide-svelte";
</script>

<form method="POST">
    <button formaction="?/logout" class="rounded-full bg-buhay-red h-12 w-12 p-2 shadow-xl m-4 hover:h-14 hover:w-14 ease-in-out duration-300">
        <LogOut class="text-warm-white h-full w-full" />
    </button>
</form>