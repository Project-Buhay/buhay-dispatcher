<script lang="ts">
    let { dispatch_data, rescuers } = $props();
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
class="my-10 flex w-5/6 content-center rounded-xl bg-black p-4 text-white sm:mx-8 md:mx-16 lg:mx-36"
>
    <div class='mr-10 w-1/6 text-2xl'>Request ID</div>
</div>

{#each dispatch_data as dispatch, i}
    <div
        class="my-10 flex w-5/6 content-center rounded-xl bg-black p-4 text-white sm:mx-8 md:mx-16 lg:mx-36"
    >
        <!-- Request ID -->
        <div class="mr-10 w-1/6 flex-initial content-center text-xl font-semibold">
            <p class="h-8 text-center align-middle">{dispatch.request_id}</p>
        </div>

        <!-- Collapsible Location Names -->
        <div class="mr-10 w-1/3 flex-initial content-center">
            <button
                class="text-xl font-semibold"
                onclick={() => {
                    DisplayLocs(dispatch.request_id);
                }}
            >
                Route {i} Locations ▼</button
            >
            {#each dispatch.coordinate_names as loc}
                <li class={are_locs_displayed[dispatch.request_id]}>{loc}</li>
            {/each}
        </div>

        <!-- Rescuer Assignment -->
        <div class="mr-10 w-1/6 content-center">
            <select name="ass_rescuer" onchange={(is_assigned[dispatch.request_id] = false)}>
                {#each rescuers as rescuer}
                    <option class="bg-black text-white" value={rescuer.person_id}
                        >{rescuer.username}</option
                    >
                {/each}
            </select>
        </div>

        <!-- Assign Button -->
        <div class="flex basis-1/6 content-center justify-center">
            {#if is_assigned[dispatch.request_id]}
                <button
                    class="h-16 w-30 rounded-3xl bg-white p-4 font-bold text-black italic"
                    disabled>Assigned</button
                >
            {:else}
                <button
                    class="h-16 w-30 rounded-3xl p-4 font-bold
            hover:bg-white hover:text-black hover:duration-150"
                    onclick={() => {
                        is_assigned[dispatch.request_id] = !is_assigned[dispatch.request_id];
                    }}>Assign</button
                >
            {/if}
        </div>

        <!-- Calculate TSP (if needed)-->
    </div>
{/each}
