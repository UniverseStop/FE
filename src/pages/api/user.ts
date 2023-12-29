import Cookies from "js-cookie";
import axios from "axios";


export const credentialLogin = async () => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            nickname: "user", password: "user" ,
        });
        const accessToken = response.headers.authorization;
        const refreshToken = response.headers.refreshtoken;
        Cookies.set("access_Token", accessToken, { path: "/" });
        Cookies.set("refresh_Token", refreshToken, { path: "/" });
        console.log(response)
        return response
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}
