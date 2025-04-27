export interface RequestGetALlEmployees{
    pageSize?: number;
    pageIndex?: number;
    keyWord?: string;
}

export interface RequestCreateEmployee{
    name: string;
}