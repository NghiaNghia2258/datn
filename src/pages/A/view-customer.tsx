import { CustomerProvider } from "../../context/A/view-customer";
import FeatViewCustomers from "../../features/A/view-customer";

const ViewCustomer = () => {
  return (
    <CustomerProvider>
      <FeatViewCustomers />
    </CustomerProvider>
  );
};

export default ViewCustomer;
