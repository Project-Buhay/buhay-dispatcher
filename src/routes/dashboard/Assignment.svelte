<script lang="ts">
    let { dispatch_data, rescuers, data } = $props();
    let is_assigned = $state({}); // If route is assigned or not
    let are_locs_displayed = $state({});

    // Initializes is_assigned list
    for (let a = 0; a < dispatch_data.length; a++) {
        Object.defineProperty(is_assigned, dispatch_data[a].request_id, { value: false });
        Object.defineProperty(are_locs_displayed, dispatch_data[a].request_id, {
            value: 'hidden mt-2',
        });
    }

    function DisplayLocs(request_id: string) {
        if (are_locs_displayed[request_id] == 'hidden mt-2')
            are_locs_displayed[request_id] = 'block mt-2';
        else are_locs_displayed[request_id] = 'hidden mt-2';
    }
</script>

<div
    class="my-10 flex w-5/6 content-center rounded-xl bg-buhay-red p-4 text-white sm:mx-8 md:mx-16 lg:mx-36"
>
    <div class="mr-10 w-1/6 text-2xl text-center font-semibold">Request ID</div>
    <div class="mr-10 w-1/3 text-2xl text-center font-semibold">Route Location Names</div>
    <div class="mr-10 w-[36.5%]  text-2xl text-center font-semibold">Assign Rescuer</div>
</div>

{#each data as dispatch, i}
    <div
        class="my-10 flex w-5/6 content-center rounded-xl bg-blue-neutral p-4 text-white sm:mx-8 md:mx-16 lg:mx-36"
    >
        <!-- Request ID -->
        <div class="mr-10 w-1/6 flex-initial content-center text-2xl font-bold">
            <p class="h-8 text-center align-middle">{dispatch.request_id}</p>
        </div>

        <!-- Collapsible Location Names -->
        <div class="mr-10 w-1/3 flex-initial content-center">
            <button
                class="text-xl font-bold"
                onclick={() => {
                    DisplayLocs(dispatch.request_id);
                }}
            >
                Route {i+1} Locations ▼</button
            >
            {#each dispatch.parsed_coordinate_names.location_names as loc}
                <div class='{are_locs_displayed[dispatch.request_id]} mt-2'>{loc}</div>
            {/each}
        </div>

        <!-- Rescuer Assignment -->
        <div class="mr-10 w-1/6 content-center">
            <select name="ass_rescuer" onchange={(is_assigned[dispatch.request_id] = false)} class='w-full bg-white text-black rounded-xl ml-[42px]'>
                {#each rescuers as rescuer}
                    <option class="bg-black text-white" value={rescuer.person_id}
                        >{rescuer.username}</option
                    >
                {/each}
            </select>
        </div>

        <!-- Assign Button -->
        <div class="flex-initial basis-1/6 content-center justify-center ml-30">
            {#if is_assigned[dispatch.request_id]}
                <button
                    class="w-[125px] h-16 rounded-2xl bg-[#144359] p-4 font-bold text-white flex-initial ml-[42px]"
                    disabled>Assigned</button
                >
            {:else}
                <button
                    class="w-[125px] h-16 rounded-2xl p-4 font-semibold ml-[42px]
            hover:bg-white hover:text-black hover:duration-150 flex-initial"
                    onclick={() => {
                        is_assigned[dispatch.request_id] = !is_assigned[dispatch.request_id];
                    }}>Assign</button
                >
            {/if}
        </div>

        <!-- Calculate TSP (if needed)-->
    </div>
{/each}
