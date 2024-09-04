import { Page } from "./page.model";

export interface PagedResult<T>{
    content: T[],
    page: Page,
}
  