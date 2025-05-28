import * as axios from './axios-instance';


export default class HomeService {
  static async GetBestSeller(
  ): Promise<any[]> {
    const response = await axios.GET(`home/get-best-seller`);
    return response;
  }
  static async GetRecomend(
  ): Promise<any[]> {
    const response = await axios.GET(`home/get-recommend`);
    return response;
  }
}