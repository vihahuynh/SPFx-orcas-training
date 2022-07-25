import { SearchResults } from "sp-pnp-js/sp";

export interface ISearchApiDemoState {
    searchResults: SearchResults,
    page: number,
    totalResults: number
}