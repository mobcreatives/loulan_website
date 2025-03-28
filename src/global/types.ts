export type TResponse<T, K extends string> = {
  status: string;
  meta: TMeta;
} & {
  [P in K]: T[];
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
