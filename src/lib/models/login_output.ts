import { number, object, type InferOutput } from 'valibot';

export const LoginOutput = object({
    person_id: number(),
    access_control: number(),
});

export type LoginOutput = InferOutput<typeof LoginOutput>;
