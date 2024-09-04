import { Band } from "./band.model";

export class GigListing {
    id!: number;
    createdDateTime?: string;
    band!: Band;
    fullTitle!: string;
    title!: string;
    startingPrice!: number;
    pricePerAdditionalHour!: number;
    minimumDurationHours!: number;
    maximumAdditionalHours!: number;
    maximumDurationHours!: number;
    maximumPrice!: number;
    durationDays!: number;
    active!: boolean;

    public getMinimumPrice(minimumHours: number): number {
        if (this.startingPrice != undefined && this.pricePerAdditionalHour != undefined && minimumHours >= this.minimumDurationHours) {
            return this.startingPrice + (minimumHours - this.minimumDurationHours) * this.pricePerAdditionalHour;
        }
        return 0;
    }

    public getMaximumPrice(maximumHours: number): number {
        if (this.startingPrice != undefined && this.pricePerAdditionalHour != undefined && maximumHours <= this.maximumDurationHours) {
            return this.startingPrice + (maximumHours - this.minimumDurationHours) * this.pricePerAdditionalHour;
        }
        return 0;
    }
}