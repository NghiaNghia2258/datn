import { PaymentProvider } from "../../../context/U/payment";
import CheckoutPage from "../../../features/U/payment";

const Payment = () => {
  return (
    <PaymentProvider>
      <CheckoutPage />
    </PaymentProvider>
  );
};

export default Payment;
