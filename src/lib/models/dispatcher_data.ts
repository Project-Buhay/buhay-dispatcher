import {
    array,
    boolean,
    nullable,
    number,
    object,
    pipe,
    string,
    transform,
    type InferOutput,
} from 'valibot';

import type { CoordinatesDatum } from './coordinates_data';
import type { Route } from './routes';

export const DispatcherDatum = object({
    id: number(),
    done: boolean(),
    rescuer_id: pipe(nullable(string()), transform(Number)),
    old_rescuer_id: pipe(nullable(string()), transform(Number)),

    // json
    coordinates_info: string(), // CoordinatesDatum
    route_info: string(), // Route
});

export const DispatcherData = array(DispatcherDatum);

export interface DispatcherDatum extends InferOutput<typeof DispatcherDatum> {
    raw_coordinates: CoordinatesDatum;
    coordinate_names: Route;
}

export type DispatcherData = DispatcherDatum[];
