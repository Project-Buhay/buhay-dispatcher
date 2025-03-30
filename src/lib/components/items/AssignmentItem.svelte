<script lang="ts">
    import { ChevronDownCircle, ChevronUpCircle } from 'lucide-svelte';

    import type { DispatcherDatum } from '$lib/models/dispatcher_data';
    import type { Rescuers } from '$lib/models/rescuers';

    interface Props {
        dispatcher_datum: DispatcherDatum;
        rescuers: Rescuers;
    }

    let { dispatcher_datum, rescuers }: Props = $props();
    let { request_id, route_info_id, parsed_coordinate_names } = $derived(dispatcher_datum);
    let { location_names } = $derived(parsed_coordinate_names);

    let are_locs_displayed = $state(false);
    let is_assigned = $state(false);
    let rescuer_id = $state('');

    function displayLocs() {
        are_locs_displayed = !are_locs_displayed;
    }

    async function assign() {
        is_assigned = !is_assigned;
        const updated = await fetch(`/assign?request_id=${request_id}&rescuer_id=${rescuer_id}`);
        console.log(updated);
    }
</script>

<div
    class="my-10 flex w-5/6 content-center rounded-xl bg-blue-neutral p-4 text-white sm:mx-8 md:mx-16 lg:mx-36"
>
    <!-- Request ID -->
    <div class="mr-10 w-1/6 flex-initial content-center text-2xl font-bold">
        <p class="h-8 text-center align-middle">{request_id}</p>
    </div>

    <!-- Collapsible Location Names -->
    <div class="mr-10 w-1/3 flex-initial content-center">
        <button class="flex items-center text-xl font-bold" onclick={displayLocs}>
            Locations
            {#if are_locs_displayed}
                <ChevronUpCircle class="ml-2" />
            {:else}
                <ChevronDownCircle class="ml-2" />
            {/if}
        </button>
        {#each location_names as loc}
            <div class="{are_locs_displayed ? 'block' : 'hidden'} mt-2">{loc}</div>
        {/each}
    </div>

    <!-- Rescuer Assignment -->
    <div class="mr-10 w-1/6 content-center">
        <select
            name="ass_rescuer"
            bind:value={rescuer_id}
            onchange={() => is_assigned = false}

            class="ml-[42px] w-full rounded-xl bg-white text-black"
            disabled={route_info_id === null || route_info_id === undefined}
        >
            <option class="bg-black text-white" value="" selected>Choose</option>
            {#each rescuers as { person_id, username }}
                <option class="bg-black text-white" value={person_id}>{username}</option>
            {/each}
        </select>
        
    </div>

    <!-- Assign Button -->
    <div class="ml-30 flex-initial basis-1/6 content-center justify-center">
        {#if is_assigned}
            <button
                class="ml-[42px] h-16 w-[125px] flex-initial rounded-2xl bg-[#144359] p-4 font-bold text-white"
                disabled>Assigned</button
            >
        {:else if rescuer_id == ""}
            <button
                class="ml-[42px] h-16 w-[125px] flex-initial rounded-2xl bg-[#144359] p-4 font-bold text-white"
                disabled>no assigned</button
            >
        {:else}
            <button
                class="ml-[42px] h-16 w-[125px] flex-initial rounded-2xl p-4
        font-semibold {route_info_id === null || route_info_id === undefined
                    ? ''
                    : 'hover:bg-white hover:text-black hover:duration-150'}"
                onclick={assign}
                disabled={route_info_id === null || route_info_id === undefined}>Assign</button
            >
        {/if}
    </div>

    <!-- Calculate TSP (if needed)-->
</div>
