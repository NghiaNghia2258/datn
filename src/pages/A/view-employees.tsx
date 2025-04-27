import { EmployeeProvider } from "../../context/A/view-employees";
import FeatViewEmployees from "../../features/A/view-employees";

const ViewEmployee = () => {
  return (
    <EmployeeProvider>
      <FeatViewEmployees />
    </EmployeeProvider>
  );
};

export default ViewEmployee;
