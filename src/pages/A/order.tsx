import { OrderProvider } from "../../context/A/view-orders";
import FeatViewOrders from "../../features/A/view-orders";

const ViewOrders = () => {
  return (
    <OrderProvider>
      <FeatViewOrders />
    </OrderProvider>
  );
};

export default ViewOrders;
