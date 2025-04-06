<script lang="ts">
    import { ChevronDownCircle, ChevronUpCircle } from 'lucide-svelte';
    import { fly } from 'svelte/transition';

    import type { DispatcherDatum } from '$lib/models/dispatcher_data';
    import type { Rescuers } from '$lib/models/rescuers';

    interface Props {
        dispatcher_datum: DispatcherDatum;
        rescuers: Rescuers;
    }

    let { dispatcher_datum, rescuers }: Props = $props();
    let { request_id, rescuer_id, parsed_coordinate_names, ongoing } = $derived(dispatcher_datum);
    let { location_names } = $derived(parsed_coordinate_names);

    let are_locs_displayed = $state(false);
    let selected_rescuer_id = $state();
    let reassigned = $state(false);

    function displayLocs() {
        are_locs_displayed = !are_locs_displayed;
    }

    async function assign() {
        const res = await fetch(
            `/assign?request_id=${request_id}&rescuer_id=${selected_rescuer_id}`,
        );

        const { success } = await res.json();
        if (success) {
            reassigned = true;
        }
    }

    $effect(() => {
        selected_rescuer_id = rescuer_id;
    });
</script>

{#if !reassigned}
    <div class="auto flex w-full justify-center">
        <div
            class="my-4 flex w-5/6 flex-row flex-wrap content-center rounded-xl bg-blue-neutral p-4 text-white sm:mx-8 md:mx-16 lg:mx-36"
            in:fly|global={{ x: -100 }}
            out:fly={{ x: 100 }}
        >
            <!-- Request ID -->
            <div
                class="mb-4 w-1/2 flex-initial content-center text-lg font-bold lg:mb-0 lg:mr-10 lg:w-1/6 lg:text-2xl"
            >
                <p class="mt-1 h-8 text-center align-middle">{request_id}</p>
            </div>

            <!-- Collapsible Location Names -->
            <div class="mb-4 w-1/2 flex-initial content-center justify-center lg:mb-0 lg:w-1/3">
                <button
                    class="text-md flex w-full items-center justify-center font-bold lg:text-xl"
                    onclick={displayLocs}
                >
                    Locations
                    {#if are_locs_displayed}
                        <ChevronUpCircle class="ml-2 h-5 lg:h-10" />
                    {:else}
                        <ChevronDownCircle class="ml-2 h-5 lg:h-10" />
                    {/if}
                </button>
                {#each location_names as loc}
                    <div
                        class="{are_locs_displayed
                            ? 'block'
                            : 'hidden'} lg:text-md mx-4 mt-2 text-xs lg:mx-10"
                    >
                        {loc}
                    </div>
                {/each}
            </div>

            <!-- Rescuer Assignment -->
            <div class="flex w-1/2 items-center lg:mr-10 lg:w-1/4">
                <select
                    name="ass_rescuer"
                    bind:value={selected_rescuer_id}
                    class="mx-4 w-5/6 rounded-xl bg-white text-sm text-black lg:ml-[42px] lg:h-12"
                    disabled={reassigned || ongoing}
                >
                    <option class="bg-black text-white" value={null}>Choose</option>
                    {#each rescuers as { person_id, username }}
                        <option class="bg-black text-white" value={person_id}>{username}</option>
                    {/each}
                </select>
            </div>

            <!-- Assign Button -->
            <div class="w-1/2 flex-initial content-center justify-center lg:ml-2 lg:basis-1/6">
                {#if !(rescuer_id === null)}
                    {#if ongoing}
                        <button
                            class="mx-2 w-5/6 flex-initial rounded-lg bg-[#144359] p-2 font-bold text-white lg:ml-[42px] lg:h-16 lg:w-[125px] lg:rounded-2xl lg:p-4"
                            disabled>Assigned</button
                        >
                    {:else}
                        <button
                            class="mx-2 w-5/6 flex-initial rounded-lg p-2 font-semibold lg:ml-[42px] lg:h-16 lg:w-[125px] lg:rounded-2xl lg:p-4 {selected_rescuer_id ===
                            null
                                ? 'text-white/50'
                                : 'hover:bg-white hover:text-black hover:duration-150'}"
                            onclick={assign}
                            disabled={selected_rescuer_id === null}>Reassign</button
                        >
                    {/if}
                {:else}
                    <button
                        class="mx-2 w-5/6 flex-initial rounded-lg p-2 font-semibold lg:ml-[42px] lg:h-16 lg:w-[125px] lg:rounded-2xl
            lg:p-4 {selected_rescuer_id === null
                            ? 'text-white/50'
                            : 'hover:bg-white hover:text-black hover:duration-150'}"
                        onclick={assign}
                        disabled={selected_rescuer_id === null}>Assign</button
                    >
                {/if}
            </div>
        </div>
    </div>
{/if}
