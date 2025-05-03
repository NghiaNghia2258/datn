
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
     
export default class DiscountService{
   static async createBundle(bundle:any): Promise<boolean> {
        console.log("create bundle", bundle);
        await delay(2000);
        return true;
   }
   static async createCampaingn(Campaingn:any): Promise<boolean> {
        console.log("create Campaingn", Campaingn);
        await delay(2000);
        return true;
    }
    static async createVoucher(Voucher:any): Promise<boolean> {
        console.log("create Voucher", Voucher);
        await delay(2000);
        return true;
    }
}