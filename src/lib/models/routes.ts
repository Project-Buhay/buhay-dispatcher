import { array, object, pipe, string, transform, type InferOutput } from 'valibot';

export const Route = object({
    data: pipe(string(), transform(Array<string>)),
});

export const Routes = array(Route);

export type Route = InferOutput<typeof Route>;
export type Routes = InferOutput<typeof Routes>;
