
export interface UserOrder {
    id: string;
    date: string;
    total: string;
    status: string;
  }
  
  export interface UserWishlistItem {
    id: string;
    name: string;
    price: string;
    image: string;
  }
  
  export interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    birthday: string;
    avatar: string;
    memberSince: string;
    rank: string;
    points: number;
  }