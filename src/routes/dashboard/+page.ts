/** @type {import('./$types').PageServerLoad} */
import { browser } from '$app/environment';
import { DispatcherDatum as DispatcherDatumSchema, type DispatcherDatum, type DispatcherData } from '$lib/models/dispatcher_data';
import { CoordinatesDatum as CoordinatesDatumSchema } from '$lib/models/coordinates_data';
import { Route as RouteSchema } from '$lib/models/routes';
import { parse } from 'valibot';

export function load() {      
    const socket = browser ? new WebSocket(`ws://buhay-backend-production.up.railway.app/ws/123`) : null;

    let dispatcher_data: DispatcherData = [];
    if (socket) {
        socket.addEventListener('message', message => {
            const parsed_json = parse(DispatcherDatumSchema, JSON.parse(message.data));
            const raw_coordinates = parse(CoordinatesDatumSchema, JSON.parse(parsed_json.coordinates_info));
            const coordinate_names = parse(RouteSchema, JSON.parse(parsed_json.route_info));

            const to_push: DispatcherDatum = { ...parsed_json, raw_coordinates, coordinate_names }
            dispatcher_data.push(to_push);
        });
    }

    return { dispatcher_data }
}