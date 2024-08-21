export interface GigListingRequest {
    bandId: number,
    startingPrice: number,
    pricePerAdditionalHour: number,
    minimumDurationHours: number,
    maximumAdditionalHours: number,
}