import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Divider,
  Grid,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Chip,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DiscountIcon from "@mui/icons-material/Discount";
import { CartItem } from "../cart/type";
import { Address, Voucher } from "./payment.response";
import { formatPrice } from "../../../utils/format-price";
import PaymentService from "../../../context/U/payment/payment.service";

// Interface cho phương thức thanh toán
interface PaymentMethod {
  id: string;
  type: "CREDIT_CARD" | "BANK_TRANSFER" | "COD" | "E_WALLET";
  name: string;
  icon: React.ReactNode;
  description: string;
}

// Interface cho phương thức vận chuyển
interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedTime: string;
  icon: React.ReactNode;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "cod",
    type: "COD",
    name: "Thanh toán khi nhận hàng",
    icon: <PaymentIcon />,
    description: "Thanh toán bằng tiền mặt khi nhận được hàng",
  },
  {
    id: "CREDIT_CARD",
    type: "CREDIT_CARD",
    name: "Thẻ tín dụng/Ghi nợ",
    icon: <CreditCardIcon />,
    description: "Thanh toán bằng thẻ Visa, MasterCard, JCB",
  },
  {
    id: "BANK_TRANSFER",
    type: "BANK_TRANSFER",
    name: "Chuyển khoản ngân hàng",
    icon: <AccountBalanceIcon />,
    description: "Chuyển khoản qua các ngân hàng nội địa",
  },
  {
    id: "VNPay",
    type: "E_WALLET",
    name: "Ví điện tử",
    icon: <CreditCardIcon />,
    description: "Thanh toán qua VNPay",
  },
];

// Dữ liệu mẫu - Danh sách phương thức vận chuyển
const shippingMethods: ShippingMethod[] = [
  {
    id: "shipping-1",
    name: "Giao hàng tiêu chuẩn",
    price: 30000,
    estimatedTime: "3-5 ngày",
    icon: <LocalShippingIcon />,
  },
  {
    id: "shipping-2",
    name: "Giao hàng nhanh",
    price: 50000,
    estimatedTime: "1-2 ngày",
    icon: <LocalShippingIcon />,
  },
  {
    id: "shipping-3",
    name: "Giao hàng hỏa tốc",
    price: 100000,
    estimatedTime: "Trong ngày",
    icon: <LocalShippingIcon />,
  },
];

// Danh sách các tỉnh/thành phố mẫu
const provinces = [
  "TP. Hồ Chí Minh",
  "Hà Nội",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
  "An Giang",
  "Bà Rịa - Vũng Tàu",
];

// Danh sách các quận/huyện mẫu (giả sử đang chọn TP. HCM)
const districts = [
  "Quận 1",
  "Quận 2",
  "Quận 3",
  "Quận 4",
  "Quận 5",
  "Quận 6",
  "Quận 7",
  "Quận 8",
];

// Danh sách các phường/xã mẫu (giả sử đang chọn Q.1)
const wards = [
  "Phường Bến Nghé",
  "Phường Bến Thành",
  "Phường Cầu Kho",
  "Phường Cầu Ông Lãnh",
  "Phường Đa Kao",
  "Phường Nguyễn Cư Trinh",
  "Phường Nguyễn Thái Bình",
  "Phường Phạm Ngũ Lão",
];

// Component trang thanh toán
const CheckoutPage: React.FC = () => {
  // State cho các bước thanh toán
  const [activeStep, setActiveStep] = useState<number>(0);
  const steps = [
    "Thông tin giao hàng",
    "Phương thức vận chuyển",
    "Phương thức thanh toán",
    "Xác nhận đơn hàng",
  ];

  // State cho thông tin địa chỉ và thanh toán
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [selectedShippingMethodId, setSelectedShippingMethodId] =
    useState<string>("shipping-1");
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] =
    useState<string>("cod");
  const [appliedVoucherId, setAppliedVoucherId] = useState<string | null>(null);
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [note, setNote] = useState<string>("");

  // State cho các dialog
  const [addressDialogOpen, setAddressDialogOpen] = useState<boolean>(false);
  const [voucherDialogOpen, setVoucherDialogOpen] = useState<boolean>(false);
  const [orderConfirmationOpen, setOrderConfirmationOpen] =
    useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [selectedCartItems, setSelectedCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("cart") ?? "[]");
    console.log(res);

    setSelectedCartItems(res);
    const fetchData = async () => {
      const address = await PaymentService.getAddress();
      setAddresses(address);
      setSelectedAddressId(address.find((addr) => addr.isDefault)?.id ?? "");
      const vouch = await PaymentService.getVoucher();
      setVouchers(vouch);
    };
    fetchData();
  }, []);
  // State cho form thêm địa chỉ mới
  const [newAddress, setNewAddress] = useState<
    Omit<Address, "id" | "isDefault">
  >({
    fullName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    ward: "",
    district: "",
    province: "",
  });

  // State cho form validation
  const [addressErrors, setAddressErrors] = useState<{
    fullName?: string;
    phoneNumber?: string;
    addressLine1?: string;
    ward?: string;
    district?: string;
    province?: string;
  }>({});

  // State cho thông báo
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({
    open: false,
    message: "",
    type: "info",
  });

  // Nhóm các sản phẩm theo cửa hàng
  const shopGroups = React.useMemo(() => {
    const groups: { [key: string]: CartItem[] } = {};

    selectedCartItems.forEach((item) => {
      if (!groups[item.shopId]) {
        groups[item.shopId] = [];
      }
      groups[item.shopId].push(item);
    });

    return Object.entries(groups).map(([shopId, items]) => ({
      shopId,
      shopName: items[0].shopName,
      shopAvatarUrl: items[0].shopAvatarUrl,
      items,
    }));
  }, [selectedCartItems]);

  // Tính tổng tiền hàng
  const subtotal = React.useMemo(() => {
    return selectedCartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [selectedCartItems]);

  // Tính phí vận chuyển
  const shippingCost = React.useMemo(() => {
    const selectedMethod = shippingMethods.find(
      (method) => method.id === selectedShippingMethodId
    );
    return selectedMethod ? selectedMethod.price : 0;
  }, [selectedShippingMethodId]);

  // Tính giảm giá từ voucher
  const discount = React.useMemo(() => {
    if (!appliedVoucherId) return 0;

    const voucher = vouchers.find((v) => v.id === appliedVoucherId);
    if (!voucher) return 0;

    // Kiểm tra điều kiện áp dụng voucher
    if (subtotal < voucher.minOrderValue) return 0;

    // Tính số tiền giảm giá
    let discountAmount = 0;
    if (voucher.discountType === "FIXED") {
      discountAmount = voucher.discountAmount;
    } else {
      // Voucher phần trăm
      discountAmount = (subtotal * voucher.discountAmount) / 100;

      // Áp dụng giới hạn giảm giá tối đa nếu có
      if (
        voucher.maxDiscountAmount &&
        discountAmount > voucher.maxDiscountAmount
      ) {
        discountAmount = voucher.maxDiscountAmount;
      }
    }

    return discountAmount;
  }, [appliedVoucherId, subtotal]);

  // Tính tổng thanh toán
  const total = React.useMemo(() => {
    return subtotal + shippingCost - discount;
  }, [subtotal, shippingCost, discount]);

  // Xử lý chuyển bước
  const handleNext = () => {
    if (activeStep === 0 && !validateShippingInfo()) {
      showNotification("Vui lòng chọn địa chỉ giao hàng", "error");
      return;
    }

    if (activeStep === steps.length - 1) {
      handlePlaceOrder();
      return;
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Xác thực thông tin giao hàng
  const validateShippingInfo = (): boolean => {
    return !!selectedAddressId;
  };

  // Xác thực form địa chỉ mới
  const validateAddressForm = (): boolean => {
    const errors: {
      fullName?: string;
      phoneNumber?: string;
      addressLine1?: string;
      ward?: string;
      district?: string;
      province?: string;
    } = {};

    if (!newAddress.fullName.trim()) {
      errors.fullName = "Vui lòng nhập họ tên";
    }

    if (!newAddress.phoneNumber.trim()) {
      errors.phoneNumber = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10}$/.test(newAddress.phoneNumber.trim())) {
      errors.phoneNumber = "Số điện thoại không hợp lệ";
    }

    if (!newAddress.addressLine1.trim()) {
      errors.addressLine1 = "Vui lòng nhập địa chỉ";
    }

    if (!newAddress.ward) {
      errors.ward = "Vui lòng chọn phường/xã";
    }

    if (!newAddress.district) {
      errors.district = "Vui lòng chọn quận/huyện";
    }

    if (!newAddress.province) {
      errors.province = "Vui lòng chọn tỉnh/thành phố";
    }

    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Xử lý thêm địa chỉ mới
  const handleAddNewAddress = async () => {
    if (!validateAddressForm()) return;

    const newId = `address-${Date.now()}`;
    const addressToAdd: Address = {
      ...(newAddress as any),
      id: newId,
      isDefault: addresses.length === 0, // Đặt làm địa chỉ mặc định nếu là địa chỉ đầu tiên
    };
    await PaymentService.createAddress(addressToAdd);
    setAddresses((prev) => [...prev, addressToAdd]);
    setSelectedAddressId(newId);
    setAddressDialogOpen(false);
    showNotification("Thêm địa chỉ mới thành công", "success");

    // Reset form
    setNewAddress({
      fullName: "",
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      ward: "",
      district: "",
      province: "",
    });
    setAddressErrors({});
  };

  // Xử lý áp dụng voucher
  const handleApplyVoucher = () => {
    if (!voucherCode.trim()) {
      showNotification("Vui lòng nhập mã giảm giá", "error");
      return;
    }

    const voucher = vouchers.find(
      (v) =>
        v.code.toLowerCase() === voucherCode.trim().toLowerCase() && v.isActive
    );

    if (!voucher) {
      showNotification("Mã giảm giá không hợp lệ hoặc đã hết hạn", "error");
      return;
    }

    if (subtotal < voucher.minOrderValue) {
      showNotification(
        `Đơn hàng tối thiểu ${formatPrice(voucher.minOrderValue)} để sử dụng mã này`,
        "error"
      );
      return;
    }

    // Kiểm tra xem voucher có áp dụng cho shop cụ thể không
    if (voucher.shopId) {
      const shopExists = selectedCartItems.some(
        (item) => item.shopId === voucher.shopId
      );
      if (!shopExists) {
        showNotification(
          "Mã giảm giá chỉ áp dụng cho một shop cụ thể không có trong đơn hàng",
          "error"
        );
        return;
      }
    }

    setAppliedVoucherId(voucher.id);
    setVoucherDialogOpen(false);
    showNotification("Áp dụng mã giảm giá thành công", "success");
  };

  // Xử lý đặt hàng
  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    await PaymentService.PlaceOrder({
      selectedAddressId,
      selectedShippingMethodId,
      selectedPaymentMethodId,
      totalPrice: total,
    });
    setIsProcessing(false);
    setOrderConfirmationOpen(true);
  };

  // Hiển thị thông báo
  const showNotification = (
    message: string,
    type: "success" | "error" | "info"
  ) => {
    setNotification({
      open: true,
      message,
      type,
    });
  };

  // Đóng thông báo
  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  // Custom style cho selected address
  const SelectedAddressCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    borderColor: theme.palette.primary.main,
    borderWidth: 2,
    position: "relative",
  }));

  // Custom style cho normal address
  const AddressCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    borderColor: theme.palette.divider,
    borderWidth: 1,
    position: "relative",
  }));

  // Hiển thị nội dung theo bước thanh toán
  const getStepContent = (step: number) => {
    switch (step) {
      case 0: // Thông tin giao hàng
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Địa chỉ giao hàng
            </Typography>

            <Grid container spacing={2}>
              {addresses.map((address) => (
                <Grid item xs={12} key={address.id}>
                  {address.id === selectedAddressId ? (
                    <SelectedAddressCard variant="outlined">
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: "bold" }}
                            >
                              {address.fullName}
                              {address.isDefault && (
                                <Chip
                                  label="Mặc định"
                                  size="small"
                                  color="primary"
                                  sx={{ ml: 1 }}
                                />
                              )}
                            </Typography>
                            <CheckCircleOutlineIcon color="primary" />
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            {address.phoneNumber}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            {address.addressLine1}
                            {address.addressLine2 &&
                              `, ${address.addressLine2}`}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            {address.ward}, {address.district},{" "}
                            {address.province}
                          </Typography>
                        </Grid>
                      </Grid>
                    </SelectedAddressCard>
                  ) : (
                    <AddressCard
                      variant="outlined"
                      onClick={() => setSelectedAddressId(address.id)}
                      sx={{ cursor: "pointer" }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant="subtitle1">
                              {address.fullName}
                              {address.isDefault && (
                                <Chip
                                  label="Mặc định"
                                  size="small"
                                  color="primary"
                                  sx={{ ml: 1 }}
                                />
                              )}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            {address.phoneNumber}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            {address.addressLine1}
                            {address.addressLine2 &&
                              `, ${address.addressLine2}`}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            {address.ward}, {address.district},{" "}
                            {address.province}
                          </Typography>
                        </Grid>
                      </Grid>
                    </AddressCard>
                  )}
                </Grid>
              ))}

              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  fullWidth
                  onClick={() => setAddressDialogOpen(true)}
                >
                  Thêm địa chỉ mới
                </Button>
              </Grid>
            </Grid>
          </Box>
        );

      case 1: // Phương thức vận chuyển
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Phương thức vận chuyển
            </Typography>

            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={selectedShippingMethodId}
                onChange={(e) => setSelectedShippingMethodId(e.target.value)}
              >
                {shippingMethods.map((method) => (
                  <Paper
                    key={method.id}
                    variant="outlined"
                    sx={{
                      mb: 2,
                      p: 2,
                      borderColor:
                        selectedShippingMethodId === method.id
                          ? "primary.main"
                          : "divider",
                      borderWidth:
                        selectedShippingMethodId === method.id ? 2 : 1,
                    }}
                  >
                    <FormControlLabel
                      value={method.id}
                      control={<Radio />}
                      label=""
                      sx={{ width: "100%", m: 0 }}
                    />
                    <Box sx={{ display: "flex", ml: 4, mt: -4 }}>
                      <Box sx={{ mr: 2, color: "text.secondary" }}>
                        {method.icon}
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1">
                          {method.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Nhận hàng trong {method.estimatedTime}
                        </Typography>
                      </Box>
                      <Typography variant="subtitle1" color="primary">
                        {formatPrice(method.price)}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </RadioGroup>
            </FormControl>

            <Box sx={{ mt: 3 }}>
              <TextField
                label="Ghi chú cho đơn hàng (tùy chọn)"
                multiline
                rows={3}
                fullWidth
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ví dụ: Thời gian giao hàng cụ thể, hướng dẫn giao hàng, v.v."
              />
            </Box>
          </Box>
        );

      case 2: // Phương thức thanh toán
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Phương thức thanh toán
            </Typography>

            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={selectedPaymentMethodId}
                onChange={(e) => setSelectedPaymentMethodId(e.target.value)}
              >
                {paymentMethods.map((method) => (
                  <Paper
                    key={method.id}
                    variant="outlined"
                    sx={{
                      mb: 2,
                      p: 2,
                      borderColor:
                        selectedPaymentMethodId === method.id
                          ? "primary.main"
                          : "divider",
                      borderWidth:
                        selectedPaymentMethodId === method.id ? 2 : 1,
                    }}
                  >
                    <FormControlLabel
                      value={method.id}
                      control={<Radio />}
                      label=""
                      sx={{ width: "100%", m: 0 }}
                    />
                    <Box sx={{ display: "flex", ml: 4, mt: -4 }}>
                      <Box sx={{ mr: 2, color: "text.secondary" }}>
                        {method.icon}
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1">
                          {method.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {method.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        );

      case 3: // Xác nhận đơn hàng
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Xác nhận đơn hàng
            </Typography>

            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Thông tin giao hàng</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {selectedAddressId && (
                  <Box>
                    {(() => {
                      const address = addresses.find(
                        (addr) => addr.id === selectedAddressId
                      );
                      if (!address) return null;

                      return (
                        <Box>
                          <Typography variant="subtitle2">
                            {address.fullName}
                          </Typography>
                          <Typography variant="body2">
                            {address.phoneNumber}
                          </Typography>
                          <Typography variant="body2">
                            {address.addressLine1}
                            {address.addressLine2 &&
                              `, ${address.addressLine2}`}
                          </Typography>
                          <Typography variant="body2">
                            {address.ward}, {address.district},{" "}
                            {address.province}
                          </Typography>
                        </Box>
                      );
                    })()}
                    <Button
                      startIcon={<EditIcon />}
                      size="small"
                      sx={{ mt: 1 }}
                      onClick={() => setActiveStep(0)}
                    >
                      Thay đổi
                    </Button>
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  Phương thức vận chuyển
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {(() => {
                  const method = shippingMethods.find(
                    (m) => m.id === selectedShippingMethodId
                  );
                  if (!method) return null;

                  return (
                    <Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ mr: 1, color: "text.secondary" }}>
                          {method.icon}
                        </Box>
                        <Typography variant="body1">{method.name}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Nhận hàng trong {method.estimatedTime}
                      </Typography>
                      <Typography variant="body2">
                        Phí vận chuyển: {formatPrice(method.price)}
                      </Typography>

                      {note && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="subtitle2">Ghi chú:</Typography>
                          <Typography variant="body2">{note}</Typography>
                        </Box>
                      )}

                      <Button
                        startIcon={<EditIcon />}
                        size="small"
                        sx={{ mt: 1 }}
                        onClick={() => setActiveStep(1)}
                      >
                        Thay đổi
                      </Button>
                    </Box>
                  );
                })()}
              </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  Phương thức thanh toán
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {(() => {
                  const method = paymentMethods.find(
                    (m) => m.id === selectedPaymentMethodId
                  );
                  if (!method) return null;

                  return (
                    <Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ mr: 1, color: "text.secondary" }}>
                          {method.icon}
                        </Box>
                        <Typography variant="body1">{method.name}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {method.description}
                      </Typography>
                      <Button
                        startIcon={<EditIcon />}
                        size="small"
                        sx={{ mt: 1 }}
                        onClick={() => setActiveStep(2)}
                      >
                        Thay đổi
                      </Button>
                    </Box>
                  );
                })()}
              </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Chi tiết đơn hàng</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Sản phẩm</TableCell>
                        <TableCell align="right">Đơn giá</TableCell>
                        <TableCell align="center">SL</TableCell>
                        <TableCell align="right">Thành tiền</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {shopGroups.map((group) => (
                        <React.Fragment key={group.shopId}>
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}
                            >
                              <Typography variant="subtitle2">
                                {group.shopName}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          {group.items.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>
                                <Box
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <CardMedia
                                    component="img"
                                    sx={{
                                      width: 50,
                                      height: 50,
                                      mr: 2,
                                      objectFit: "contain",
                                    }}
                                    image={
                                      item.imageUrl ||
                                      "https://placehold.co/50x50"
                                    }
                                    alt={item.name}
                                  />
                                  <Typography variant="body2">
                                    {item.name}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell align="right">
                                {formatPrice(item.price)}
                              </TableCell>
                              <TableCell align="center">
                                {item.quantity}
                              </TableCell>
                              <TableCell align="right">
                                {formatPrice(item.price * item.quantity)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </Box>
        );

      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Thanh toán
      </Typography>

      <Grid container spacing={4}>
        {/* Stepper và nội dung chính */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {getStepContent(activeStep)}

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
            >
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowBackIcon />}
              >
                Quay lại
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <CircularProgress size={24} />
                ) : activeStep === steps.length - 1 ? (
                  "Đặt hàng"
                ) : (
                  "Tiếp tục"
                )}
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Phần tổng kết và thanh toán */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, position: "sticky", top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Tóm tắt đơn hàng
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body1">Tổng tiền hàng:</Typography>
                <Typography variant="body1">{formatPrice(subtotal)}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body1">Phí vận chuyển:</Typography>
                <Typography variant="body1">
                  {formatPrice(shippingCost)}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body1">Giảm giá:</Typography>
                <Typography variant="body1" color="error">
                  {discount > 0 ? `- ${formatPrice(discount)}` : formatPrice(0)}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              {appliedVoucherId ? (
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <DiscountIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="primary">
                      {(() => {
                        const voucher = vouchers.find(
                          (v) => v.id === appliedVoucherId
                        );
                        return voucher ? `Mã: ${voucher.code}` : "";
                      })()}
                    </Typography>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => setAppliedVoucherId(null)}
                      sx={{ ml: "auto" }}
                    >
                      Xóa
                    </Button>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {(() => {
                      const voucher = vouchers.find(
                        (v) => v.id === appliedVoucherId
                      );
                      return voucher ? voucher.description : "";
                    })()}
                  </Typography>
                </Box>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<DiscountIcon />}
                  fullWidth
                  onClick={() => setVoucherDialogOpen(true)}
                  sx={{ mb: 2 }}
                >
                  Sử dụng mã giảm giá
                </Button>
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography variant="h6">Thành tiền:</Typography>
              <Typography variant="h6" color="error">
                {formatPrice(total)}
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              (Đã bao gồm VAT nếu có)
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Dialog thêm địa chỉ mới */}
      <Dialog
        open={addressDialogOpen}
        onClose={() => setAddressDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Thêm địa chỉ mới</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Họ và tên"
                fullWidth
                required
                value={newAddress.fullName}
                onChange={(e) =>
                  setNewAddress((prev) => ({
                    ...prev,
                    fullName: e.target.value,
                  }))
                }
                error={!!addressErrors.fullName}
                helperText={addressErrors.fullName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Số điện thoại"
                fullWidth
                required
                value={newAddress.phoneNumber}
                onChange={(e) =>
                  setNewAddress((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
                error={!!addressErrors.phoneNumber}
                helperText={addressErrors.phoneNumber}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth required error={!!addressErrors.province}>
                <InputLabel id="province-label">Tỉnh/Thành phố</InputLabel>
                <Select
                  labelId="province-label"
                  value={newAddress.province}
                  label="Tỉnh/Thành phố"
                  onChange={(e) =>
                    setNewAddress((prev) => ({
                      ...prev,
                      province: e.target.value,
                    }))
                  }
                >
                  {provinces.map((province) => (
                    <MenuItem key={province} value={province}>
                      {province}
                    </MenuItem>
                  ))}
                </Select>
                {addressErrors.province && (
                  <FormHelperText>{addressErrors.province}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth required error={!!addressErrors.district}>
                <InputLabel id="district-label">Quận/Huyện</InputLabel>
                <Select
                  labelId="district-label"
                  value={newAddress.district}
                  label="Quận/Huyện"
                  onChange={(e) =>
                    setNewAddress((prev) => ({
                      ...prev,
                      district: e.target.value,
                    }))
                  }
                  disabled={!newAddress.province}
                >
                  {districts.map((district) => (
                    <MenuItem key={district} value={district}>
                      {district}
                    </MenuItem>
                  ))}
                </Select>
                {addressErrors.district && (
                  <FormHelperText>{addressErrors.district}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth required error={!!addressErrors.ward}>
                <InputLabel id="ward-label">Phường/Xã</InputLabel>
                <Select
                  labelId="ward-label"
                  value={newAddress.ward}
                  label="Phường/Xã"
                  onChange={(e) =>
                    setNewAddress((prev) => ({ ...prev, ward: e.target.value }))
                  }
                  disabled={!newAddress.district}
                >
                  {wards.map((ward) => (
                    <MenuItem key={ward} value={ward}>
                      {ward}
                    </MenuItem>
                  ))}
                </Select>
                {addressErrors.ward && (
                  <FormHelperText>{addressErrors.ward}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Địa chỉ cụ thể"
                fullWidth
                required
                value={newAddress.addressLine1}
                onChange={(e) =>
                  setNewAddress((prev) => ({
                    ...prev,
                    addressLine1: e.target.value,
                  }))
                }
                placeholder="Số nhà, tên đường..."
                error={!!addressErrors.addressLine1}
                helperText={addressErrors.addressLine1}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Địa chỉ bổ sung (tùy chọn)"
                fullWidth
                value={newAddress.addressLine2 || ""}
                onChange={(e) =>
                  setNewAddress((prev) => ({
                    ...prev,
                    addressLine2: e.target.value,
                  }))
                }
                placeholder="Tòa nhà, lầu, số phòng..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddressDialogOpen(false)}>Hủy</Button>
          <Button variant="contained" onClick={handleAddNewAddress}>
            Lưu địa chỉ
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog chọn voucher */}
      <Dialog
        open={voucherDialogOpen}
        onClose={() => setVoucherDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Mã giảm giá</DialogTitle>
        <DialogContent>
          <TextField
            label="Nhập mã giảm giá"
            fullWidth
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            placeholder="Ví dụ: SALE10"
            sx={{ mb: 3, mt: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    onClick={handleApplyVoucher}
                    disabled={!voucherCode.trim()}
                  >
                    Áp dụng
                  </Button>
                </InputAdornment>
              ),
            }}
          />

          <Typography variant="subtitle1" gutterBottom>
            Voucher khả dụng
          </Typography>

          {vouchers.map((voucher) => (
            <Paper
              key={voucher.id}
              variant="outlined"
              sx={{ mb: 2, p: 2, cursor: "pointer" }}
              onClick={() => {
                setVoucherCode(voucher.code);
              }}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DiscountIcon fontSize="large" color="primary" />
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="subtitle2">{voucher.code}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {voucher.description}
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    color="text.secondary"
                  >
                    HSD:{" "}
                    {new Date(voucher.expiryDate).toLocaleDateString("vi-VN")}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setVoucherCode(voucher.code);
                      handleApplyVoucher();
                    }}
                  >
                    Chọn
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVoucherDialogOpen(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog xác nhận đơn hàng thành công */}
      <Dialog open={orderConfirmationOpen} maxWidth="sm" fullWidth>
        <DialogContent sx={{ textAlign: "center", py: 4 }}>
          <CheckCircleOutlineIcon
            color="success"
            sx={{ fontSize: 80, mb: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            Đặt hàng thành công!
          </Typography>
          <Typography variant="body1" paragraph>
            Cảm ơn bạn đã đặt hàng. Mã đơn hàng của bạn là{" "}
            <strong>#{Math.floor(Math.random() * 1000000)}</strong>.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Chúng tôi đã gửi email xác nhận đơn hàng đến địa chỉ email của bạn.
            Bạn có thể theo dõi trạng thái đơn hàng trong mục "Đơn hàng của
            tôi".
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button variant="outlined">Xem chi tiết đơn hàng</Button>
          <Button variant="contained">Tiếp tục mua sắm</Button>
        </DialogActions>
      </Dialog>

      {/* Thông báo */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.type}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CheckoutPage;
