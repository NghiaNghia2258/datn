import { InboundReceiptProvider } from "../../context/A/inbound-receipt";
import FeatCreateInboundReceipt from "../../features/A/create-update-inbound-receipt";

const CreateUpdateInboundReceipt = () => {
  return (
    <InboundReceiptProvider>
      <FeatCreateInboundReceipt />
    </InboundReceiptProvider>
  );
};

export default CreateUpdateInboundReceipt;
