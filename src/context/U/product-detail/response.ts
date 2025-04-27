export interface Review {
    id: number;
    user: string;
    rating: number;
    comment: string;
    date: string;
}

export interface ProductSpecificationItem {
    specName: string;
    specValue: string;
}