import { type InferOutput, array, literal, number, object, record } from 'valibot';

export const CoordinatesDatum = object({
    raw_coordinates: array(record(literal('coordinates'), array(number()))),
});

export const CoordinatesData = array(CoordinatesDatum);

export type CoordinatesDatum = InferOutput<typeof CoordinatesDatum>;
export type CoordinatesData = InferOutput<typeof CoordinatesData>;
