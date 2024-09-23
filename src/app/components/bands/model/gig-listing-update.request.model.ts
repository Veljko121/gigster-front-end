export interface GigListingUpdateRequest {
    title: string,
    startingPrice: number,
    pricePerAdditionalHour: number,
    minimumDurationHours: number,
    maximumAdditionalHours: number,
}