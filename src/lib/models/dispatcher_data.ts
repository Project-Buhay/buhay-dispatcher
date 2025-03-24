import {
    type InferOutput,
    array,
    boolean,
    nullable,
    nullish,
    number,
    object,
    string,
} from 'valibot';

import type { CoordinatesDatum } from './coordinates_data';
import type { Route } from './routes';

export const DispatcherDatum = object({
    constituent_id: nullish(number()),
    old_rescuer_id: nullable(number()),
    ongoing: boolean(),
    request_id: number(),
    rescued: boolean(),
    rescuer_id: nullable(number()),
    route_info_id: nullable(number()),

    // json
    coordinate_names: string(), // Route
    raw_coordinates: string(), // CoordinatesDatum
});

export const DispatcherData = array(DispatcherDatum);

export interface DispatcherDatum extends InferOutput<typeof DispatcherDatum> {
    parsed_coordinate_names: Route;
    parsed_raw_coordinates: CoordinatesDatum;
}

export type DispatcherData = DispatcherDatum[];
