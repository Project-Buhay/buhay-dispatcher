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

    const socket = browser ? new WebSocket(`ws://${PUBLIC_API_URL}/ws/${PUBLIC_USER_ID}`) : null;

    let dispatcher_data: DispatcherData = $state([]);
    if (socket) {
        socket.addEventListener('message', message => {
            const parsed_json = parse(DispatcherDatumSchema, JSON.parse(message.data));

            const { route_info_id, ongoing } = parsed_json;
            if (route_info_id === null || ongoing) {
                return;
            }

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

<div
    class="my-10 flex w-5/6 content-center rounded-xl bg-buhay-green p-4 text-white sm:mx-8 md:mx-16 lg:mx-36"
>
    <div class="mr-10 w-1/6 text-center text-2xl font-semibold">Request ID</div>
    <div class="mr-10 w-1/3 text-center text-2xl font-semibold">Route Location Names</div>
    <div class="mr-10 w-[36.5%] text-center text-2xl font-semibold">Assign Rescuer</div>
</div>

{#each dispatcher_data as dispatcher_datum}
    <AssignmentItem {dispatcher_datum} {rescuers} />
{/each}
