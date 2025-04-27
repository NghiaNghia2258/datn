export type CustomerDashboardStats = {
    /** Tổng số khách hàng hiện có trong hệ thống */
    totalCustomers: number;
  
    /** Số lượng khách hàng đang hoạt động (isActive = true) */
    activeCustomers: number;
  
    /** Số lượng khách hàng đã bị khóa hoặc không hoạt động (isActive = false) */
    inactiveCustomers: number;
  
    /** Số khách hàng đăng ký mới trong tháng hiện tại */
    newCustomersThisMonth: number;
  
    /** Khách hàng có tổng chi tiêu cao nhất */
    topSpender: {
      /** ID của khách hàng chi tiêu cao nhất */
      id: string;
  
      /** Họ tên khách hàng */
      name: string;
  
      /** Tổng số tiền đã chi tiêu của khách hàng này */
      totalSpent: number;
    };
  };
  
  export type CustomerDetailStats = {
    /** Tổng số đơn hàng mà khách hàng đã đặt */
    totalOrders: number;
  
    /** Tổng tiền khách hàng đã chi tiêu (tổng các đơn hàng hoàn tất) */
    totalSpent: number;
  
    /** Tỷ lệ hủy đơn hàng = số đơn bị hủy / tổng đơn hàng (giá trị từ 0 → 1) */
    cancelRate: number;
  
    /** Ngày của đơn hàng gần nhất (định dạng ISO) */
    lastOrderDate: string;
  
    /** Sản phẩm khách mua nhiều nhất, null nếu chưa mua gì */
    topProduct: {
      /** Tên sản phẩm */
      name: string;
  
      /** Số lần khách đã mua sản phẩm đó */
      timesPurchased: number;
    } | null;
  
    /** Ngày khách tạo tài khoản (định dạng ISO) */
    joinedAt: string;
  
    /** Trạng thái xác minh (email/điện thoại đã xác thực hay chưa) */
    isVerified: boolean;
  
    /** Số lượng đánh giá sản phẩm mà khách hàng đã viết */
    totalReviews: number;
  
    /** Số lượt đánh giá của khách bị người khác báo cáo */
    reportCount: number;
  };
  