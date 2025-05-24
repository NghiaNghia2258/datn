import * as axios from './axios-instance';

export default class AuthService{
    static async Login(username: string, password: string) {
        const res = await axios.POST("",{
            username,
            password
        })
        if(res.isSucceeded){
            localStorage.setItem("accessToken", res.data.accessToken);
            return true;
        }
        return false;
    }
}