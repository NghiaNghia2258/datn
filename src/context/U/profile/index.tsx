// src/contexts/ProfileContext.tsx

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserProfile, UserOrder, UserWishlistItem } from "./response";
import UserProfileService from "./service";

interface ProfileContextType {
  user: UserProfile;
  isLoading: boolean;
  orders: UserOrder[];
  totalOrders: number;
  wishlist: UserWishlistItem[];
  totalWishlist: number;
  loadMoreOrders: () => void;
  loadMoreWishlist: () => void;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined
);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile>({
    id: "1234567",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0987654321",
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    birthday: "15/05/1990",
    avatar: "https://source.unsplash.com/random/?portrait",
    memberSince: "20/04/2020",
    rank: "Gold",
    points: 1450,
  });

  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [totalOrders, setTotalOrders] = useState<number>(0);

  const [wishlist, setWishlist] = useState<UserWishlistItem[]>([]);
  const [totalWishlist, setTotalWishlist] = useState<number>(0);

  const [orderPage, setOrderPage] = useState(1);
  const [wishlistPage, setWishlistPage] = useState(1);

  const pageSize = 2; // Số lượng item mỗi lần gọi

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const res = await UserProfileService.getUserProfile();
      setUser(res);
    } catch (error) {
      console.error("Lỗi khi fetch user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrders = async (pageIndex: number) => {
    try {
      const res = await UserProfileService.getUserOrders(pageIndex, pageSize);
      if (!res.data) return;
      setOrders(res.data);
      setTotalOrders(res.totalRecordsCount ?? 0);
    } catch (error) {
      console.error("Lỗi khi fetch orders:", error);
    }
  };

  const fetchWishlist = async (pageIndex: number) => {
    try {
      const res = await UserProfileService.getUserWishlist(pageIndex, pageSize);
      if (!res.data) return;
      setWishlist(res.data);
      setTotalWishlist(res.totalRecordsCount ?? 0);
    } catch (error) {
      console.error("Lỗi khi fetch wishlist:", error);
    }
  };

  const loadMoreOrders = () => {
    const nextPage = orderPage + 1;
    fetchOrders(nextPage);
    setOrderPage(nextPage);
  };

  const loadMoreWishlist = () => {
    const nextPage = wishlistPage + 1;
    fetchWishlist(nextPage);
    setWishlistPage(nextPage);
  };

  useEffect(() => {
    fetchUser();
    fetchOrders(1);
    fetchWishlist(1);
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        user,
        isLoading,
        orders,
        totalOrders,
        wishlist,
        totalWishlist,
        loadMoreOrders,
        loadMoreWishlist,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile phải được dùng bên trong ProfileProvider");
  }
  return context;
};
