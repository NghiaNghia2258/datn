export interface Brand{
    id: string;
    name: string;
}

interface StorePolicy {
    title: string;
    description: string;
  }
  
export interface Store {
    id: string;
    name: string;
    description: string;
    logo: string;
    coverImage: string;
    rating: number;
    reviewCount: number;
    followers: number;
    joinDate: string; 
    verified: boolean;
    location: string;
    contactPhone: string;
    contactEmail: string;
    categories: string[];
    policies: StorePolicy[];
    facebook: string;
    instagram: string;
    twitter: string;
    isFollow: boolean;
  }
  
export interface Product {
    id: string;
    name: string;
    images: string[];
    price: number;
    originalPrice: number;
    discount: number; // phần trăm giảm giá
    rating: number;
    reviewCount: number;
    inStock: boolean;
    isNew: boolean;
    isBestSeller: boolean;
    category: string;
    brand: string;
    shortDescription: string;
    variants: string[]; 
  }
  