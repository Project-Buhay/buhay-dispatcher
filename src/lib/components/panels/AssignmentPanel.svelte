<script lang="ts">
    import { parse } from 'valibot';

    import { browser } from '$app/environment';
    import { PUBLIC_API_URL, PUBLIC_USER_ID } from '$env/static/public';

    import {
        DispatcherDatum as DispatcherDatumSchema,
        type DispatcherDatum,
        type DispatcherData,
    } from '$lib/models/dispatcher_data';
    import { CoordinatesDatum as CoordinatesDatumSchema } from '$lib/models/coordinates_data';
    import { Route as RouteSchema } from '$lib/models/routes';
    import type { Rescuers } from '$lib/models/rescuers';

    import AssignmentItem from '$lib/components/items/AssignmentItem.svelte';

    interface Props {
        rescuers: Rescuers;
    }

    let { rescuers }: Props = $props();

    const socket = browser ? new WebSocket(`wss://${PUBLIC_API_URL}/ws/${PUBLIC_USER_ID}`) : null;

    let dispatcher_data: DispatcherData = $state([]);
    if (socket) {
        socket.addEventListener('message', message => {
            console.log(JSON.parse(message.data));
            const parsed_json = parse(DispatcherDatumSchema, JSON.parse(message.data));

            const { route_info_id, request_id, rescued } = parsed_json;
            for (let idx = 0; idx < dispatcher_data.length; idx++) {
                if (dispatcher_data[idx].request_id == request_id) dispatcher_data.splice(idx, 1);
            }
            if (rescued || route_info_id === null) return;

            const parsed_coordinate_names = parse(
                RouteSchema,
                JSON.parse(parsed_json.coordinate_names),
            );
            const parsed_raw_coordinates = parse(
                CoordinatesDatumSchema,
                JSON.parse(parsed_json.raw_coordinates),
            );
            const to_push: DispatcherDatum = {
                ...parsed_json,
                parsed_coordinate_names,
                parsed_raw_coordinates,
            };
            dispatcher_data.push(to_push);
        });
    }
</script>

<div class="flex w-full content-center justify-center">
    <div
        class="auto mb-4 mt-10 flex w-5/6 content-center rounded-xl bg-buhay-green p-4 text-white sm:mx-8 md:mx-16 lg:mx-36"
    >
        <div
            class="text-md w-1/2 flex-initial content-center text-center font-semibold md:text-lg lg:mr-10 lg:w-1/6 lg:text-2xl"
        >
            Request ID
        </div>
        <div
            class="text-md w-1/2 content-center text-center font-semibold md:text-lg lg:mr-16 lg:w-1/3 lg:text-2xl"
        >
            Route Location Names
        </div>
        <div
            class="text-md invisible w-[0%] flex-initial font-semibold md:w-[36.5%] md:content-center md:text-center md:text-lg lg:visible lg:text-2xl"
        >
            Rescuer Assignment
        </div>
    </div>
</div>

{#each dispatcher_data as dispatcher_datum}
    <AssignmentItem {dispatcher_datum} {rescuers} />
{/each}
