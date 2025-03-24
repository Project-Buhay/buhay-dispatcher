import { parse } from 'valibot';

import { browser } from '$app/environment';

import {
    DispatcherDatum as DispatcherDatumSchema,
    type DispatcherDatum,
    type DispatcherData,
} from '$lib/models/dispatcher_data';
import { CoordinatesDatum as CoordinatesDatumSchema } from '$lib/models/coordinates_data';
import { Route as RouteSchema } from '$lib/models/routes';

export function load() {
    const socket = browser
        ? new WebSocket('ws://buhay-backend-production.up.railway.app/ws/0')
        : null;

    const dispatcher_data: DispatcherData = [];
    if (socket) {
        socket.addEventListener('message', message => {
            const parsed_json = parse(DispatcherDatumSchema, JSON.parse(message.data));
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

    return { dispatcher_data };
}
