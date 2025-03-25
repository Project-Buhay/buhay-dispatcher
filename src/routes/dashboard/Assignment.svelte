<script lang="ts">
    import { ChevronDownCircle, ChevronUpCircle } from 'lucide-svelte'

    import type { DispatcherData } from "$lib/models/dispatcher_data";
    import type { Rescuers } from "$lib/models/rescuers";

    interface Props {
        rescuers: Rescuers,
        dispatcher_data: DispatcherData
    }

    let { rescuers, dispatcher_data }: Props = $props();

    let are_locs_displayed: Record<string, boolean> = $derived.by(() => {
        const _are_locs_displayed: Record<string, boolean> = {};
        dispatcher_data.forEach(({ request_id }) => _are_locs_displayed[request_id] = false);
        return _are_locs_displayed;
    });

    let is_assigned: Record<string, boolean> = $derived.by(() => {
        const _is_assigned: Record<string, boolean> = {};
        dispatcher_data.forEach(({ request_id }) => _is_assigned[request_id] = false);
        return _is_assigned;
    });

    function displayLocs(request_id: number) {
        are_locs_displayed[request_id] = !are_locs_displayed[request_id];
    }
</script>

<div
    class="my-10 flex w-5/6 content-center rounded-xl bg-buhay-red p-4 text-white sm:mx-8 md:mx-16 lg:mx-36"
>
    <div class="mr-10 w-1/6 text-center text-2xl font-semibold">Request ID</div>
    <div class="mr-10 w-1/3 text-center text-2xl font-semibold">Route Location Names</div>
    <div class="mr-10 w-[36.5%] text-center text-2xl font-semibold">Assign Rescuer</div>
</div>

{#each dispatcher_data as { request_id, route_info_id, parsed_coordinate_names }}
    <div
        class="my-10 flex w-5/6 content-center rounded-xl bg-blue-neutral p-4 text-white sm:mx-8 md:mx-16 lg:mx-36"
    >
        <!-- Request ID -->
        <div class="mr-10 w-1/6 flex-initial content-center text-2xl font-bold">
            <p class="h-8 text-center align-middle">{request_id}</p>
        </div>

        <!-- Collapsible Location Names -->
        <div class="mr-10 w-1/3 flex-initial content-center">
            <button
                class="text-xl font-bold flex items-center"
                onclick={() => {
                    displayLocs(request_id);
                }}
            >
                Locations
                {#if are_locs_displayed[request_id]}
                    <ChevronUpCircle class="ml-2" />
                {:else}
                    <ChevronDownCircle class="ml-2" />
                {/if}
            </button>
            {#each parsed_coordinate_names.location_names as loc}
                <div class="{are_locs_displayed[request_id] ? 'block' : 'hidden'} mt-2">{loc}</div>
            {/each}
        </div>

        <!-- Rescuer Assignment -->
        <div class="mr-10 w-1/6 content-center">
            <select
                name="ass_rescuer"
                onchange={() => is_assigned[request_id] = false}
                class="ml-[42px] w-full rounded-xl bg-white text-black"
                disabled={route_info_id === null || route_info_id === undefined}
            >
                <option class="bg-black text-white" value="" selected>Choose</option>
                {#each rescuers as { person_id, username }}
                    <option class="bg-black text-white" value={person_id}
                        >{username}</option
                    >
                {/each}
            </select>
        </div>

        <!-- Assign Button -->
        <div class="ml-30 flex-initial basis-1/6 content-center justify-center">
            {#if is_assigned[request_id]}
                <button
                    class="ml-[42px] h-16 w-[125px] flex-initial rounded-2xl bg-[#144359] p-4 font-bold text-white"
                    disabled>Assigned</button
                >
            {:else}
                <button
                    class="ml-[42px] h-16 w-[125px] flex-initial rounded-2xl p-4
            font-semibold {route_info_id === null || route_info_id === undefined ? '' : 'hover:bg-white hover:text-black hover:duration-150'}"
                    onclick={() => is_assigned[request_id] = !is_assigned[request_id]}
                    disabled={route_info_id === null || route_info_id === undefined}
                    >Assign</button
                >
            {/if}
        </div>

        <!-- Calculate TSP (if needed)-->
    </div>
{/each}
