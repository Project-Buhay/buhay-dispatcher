import { array, object, type InferOutput, pipe, transform, string } from 'valibot';

export const CoordinatesDatum = object({
    data: pipe(
        string(),
        transform(input => {
            const arr = input.split(',');
            const nums: number[] = [];
            arr.forEach(st => {
                nums.push(Number(st));
            });
            return nums;
        }),
    ),
});

export const CoordinatesData = array(CoordinatesDatum);

export type CoordinatesDatum = InferOutput<typeof CoordinatesDatum>;
export type CoordinatesData = InferOutput<typeof CoordinatesData>;
