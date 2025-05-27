import * as axios from './axios-instance';


export default class InboundReceiptService {
  static async GetBestSeller(
    options?: any
  ): Promise<any[]> {
    const response = await axios.GET(`home/get-best-seller`, {
      params: options,
    });
    return response;
  }

}