import * as axios from './axios-instance';

export default class AuthService{
    static async Login(username: string, password: string) {
        const res = await axios.POST("auth/sign-in",{
            username,
            password
        })
        if(res.isSucceeded){
            localStorage.setItem("accessToken", res.data.accessToken);
            return res;
        }
        return res;
    }
    static async CustomerRegist(model: any) {
        const res = await axios.POST("customer/register", model)
        return res;
    }
    static async StoreRegist(model: any) {
        const res = await axios.POST("store/register", model)
        return res;
    }
}