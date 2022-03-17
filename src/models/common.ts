export interface PaginationParams {
  _limit?: number;
  _page: number;
  _total?: number;
}

export interface ListResponseParams<T> {
  data: T[];
  pagination: PaginationParams;
}

export interface ListParams {
  _limit?: number;
  _page: number;
  _sort: string;

  _order: 'asc' | 'desc';
  [key: string]: any;
}
