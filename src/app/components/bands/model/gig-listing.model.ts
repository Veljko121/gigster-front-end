import { Band } from "./band.model";

export interface GigListing {
    id: number,
    createdDateTime: string,
    band: Band,
    startingPrice: number,
    pricePerAdditionalHour: number,
    minimumDurationHours: number,
    maximumAdditionalHours: number,
    maximumDurationHours: number,
    durationDays: number,
    active: boolean,
}