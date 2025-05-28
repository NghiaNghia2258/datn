export interface OptionFilter{
    pageSize: number;
    pageIndex: number;
    storeId?: string;

    keyWord?: string;
    branchIds?: string[];
    categoryId?: string;
    sortBy?: string;
}