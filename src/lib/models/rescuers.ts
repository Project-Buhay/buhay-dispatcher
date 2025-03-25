import { array, number, string, object, type InferOutput } from "valibot";

export const Rescuer = object({
    person_id: number(),
    username: string()
});

export const Rescuers = array(Rescuer);

export type Rescuer = InferOutput<typeof Rescuer>;
export type Rescuers = InferOutput<typeof Rescuers>;