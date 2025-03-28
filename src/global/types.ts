export type TResponse<T> = {
  status: string;
  data: T[];
  meta: TMeta;
};
export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
