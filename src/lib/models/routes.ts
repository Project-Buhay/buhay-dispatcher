import { type InferOutput, array, object, string } from 'valibot';

export const Route = object({
    location_names: array(string()),
});

export const Routes = array(Route);

export type Route = InferOutput<typeof Route>;
export type Routes = InferOutput<typeof Routes>;
