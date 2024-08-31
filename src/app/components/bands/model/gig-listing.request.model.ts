export interface GigListingRequest {
    bandId: number,
    title: string,
    startingPrice: number,
    pricePerAdditionalHour: number,
    minimumDurationHours: number,
    maximumAdditionalHours: number,
    durationDays: number,
}