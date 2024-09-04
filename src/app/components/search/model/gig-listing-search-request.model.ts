export interface GigListingSearchRequest {
    page: number,
    pageSize: number,
    query: string,
    bandTypes: string[],
    genreIds: number[],
    maximumPrice: number,
    durationHours: number,
}