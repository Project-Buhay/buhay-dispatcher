<script lang="ts">
    import { slide } from 'svelte/transition';
    import { LogOut, AlignJustify } from 'lucide-svelte';
    let show_navbar = $state(false);
</script>

<div class="relative m-12 lg:m-12">
    {#if show_navbar}
        <form
            method="POST"
            transition:slide
            class="absolute bottom-[-32px] rounded-2xl bg-buhay-green pb-8 lg:top-[16px] lg:pt-12"
        >
            <button
                formaction="?/logout"
                class="h-12 w-12 rounded-2xl bg-buhay-green p-2 duration-300 ease-in-out hover:bg-buhay-red"
            >
                <LogOut class="h-full w-full text-white" />
            </button>
        </form>
    {/if}

    <button
        class="absolute top-0 h-12 w-12 rounded-2xl bg-buhay-green p-2 shadow-xl hover:bg-[#358565]"
        onclick={() => {
            show_navbar = !show_navbar;
        }}
    >
        <AlignJustify class="h-full w-full text-white" />
    </button>
</div>
