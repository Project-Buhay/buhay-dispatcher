<script lang="ts">
    let { rescuers, data } = $props();
    let is_assigned = $state(Array(data.length).fill(false)); // If route is assigned or not
    let are_locs_displayed = $state(Array(data.length).fill('hidden mt-2'));

    function DisplayLocs(request_id: number) {
        if (are_locs_displayed[request_id] == 'hidden mt-2')
            are_locs_displayed[request_id] = 'block mt-2';
        else are_locs_displayed[request_id] = 'hidden mt-2';
    }
</script>

<div
    class="my-10 flex w-5/6 content-center rounded-xl bg-buhay-red p-4 text-white sm:mx-8 md:mx-16 lg:mx-36"
>
    <div class="mr-10 w-1/6 text-center text-2xl font-semibold">Request ID</div>
    <div class="mr-10 w-1/3 text-center text-2xl font-semibold">Route Location Names</div>
    <div class="mr-10 w-[36.5%] text-center text-2xl font-semibold">Assign Rescuer</div>
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
                    DisplayLocs(i);
                }}
            >
                Route {i + 1} Locations ▼</button
            >
            {#each dispatch.parsed_coordinate_names.location_names as loc}
                <div class="{are_locs_displayed[i]} mt-2">{loc}</div>
            {/each}
        </div>

        <!-- Rescuer Assignment -->
        <div class="mr-10 w-1/6 content-center">
            <select
                name="ass_rescuer"
                onchange={() => {
                    is_assigned[i] = false;
                }}
                class="ml-[42px] w-full rounded-xl bg-white text-black"
            >
                {#each rescuers as rescuer}
                    <option class="bg-black text-white" value={rescuer.person_id}
                        >{rescuer.username}</option
                    >
                {/each}
            </select>
        </div>

        <!-- Assign Button -->
        <div class="ml-30 flex-initial basis-1/6 content-center justify-center">
            {#if is_assigned[i]}
                <button
                    class="ml-[42px] h-16 w-[125px] flex-initial rounded-2xl bg-[#144359] p-4 font-bold text-white"
                    disabled>Assigned</button
                >
            {:else}
                <button
                    class="ml-[42px] h-16 w-[125px] flex-initial rounded-2xl p-4
            font-semibold hover:bg-white hover:text-black hover:duration-150"
                    onclick={() => {
                        is_assigned[i] = !is_assigned[i];
                    }}>Assign</button
                >
            {/if}
        </div>

        <!-- Calculate TSP (if needed)-->
    </div>
{/each}
