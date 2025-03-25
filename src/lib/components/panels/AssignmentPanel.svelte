<script lang="ts">
    import type { DispatcherData } from '$lib/models/dispatcher_data';
    import type { Rescuers } from '$lib/models/rescuers';

    import AssignmentItem from '$lib/components/items/AssignmentItem.svelte';

    interface Props {
        dispatcher_data: DispatcherData;
        rescuers: Rescuers;
    }

    let { dispatcher_data, rescuers }: Props = $props();
</script>

<div
    class="my-10 flex w-5/6 content-center rounded-xl bg-buhay-red p-4 text-white sm:mx-8 md:mx-16 lg:mx-36"
>
    <div class="mr-10 w-1/6 text-center text-2xl font-semibold">Request ID</div>
    <div class="mr-10 w-1/3 text-center text-2xl font-semibold">Route Location Names</div>
    <div class="mr-10 w-[36.5%] text-center text-2xl font-semibold">Assign Rescuer</div>
</div>

{#each dispatcher_data as dispatcher_datum}
    <AssignmentItem {dispatcher_datum} {rescuers} />
{/each}
