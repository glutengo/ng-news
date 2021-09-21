export interface Pagination {
  page: number;
  size: number;
  sort: string[];
  bypassCache?: boolean;
}

export interface Search {
  query: string;
}

export interface SearchWithPagination extends Search, Pagination {}
