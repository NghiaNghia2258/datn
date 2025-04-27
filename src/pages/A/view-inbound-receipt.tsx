import { InboundReceiptProvider } from "../../context/A/view-inbound-receipt";
import FeatViewInboundReceipts from "../../features/A/view-inbound-receipt";

const ViewInboundReceipt = () => {
  return (
    <InboundReceiptProvider>
      <FeatViewInboundReceipts />
    </InboundReceiptProvider>
  );
};

export default ViewInboundReceipt;
