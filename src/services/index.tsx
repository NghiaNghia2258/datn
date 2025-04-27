export interface ApiResult<T> {
  data?: T;
  isSucceeded: boolean;
  statusCode: number;
  message: string;
  totalRecordsCount?: number;
}
