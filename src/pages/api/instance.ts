import axios from 'axios';
import Cookies from 'js-cookie';

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(
    function (config) {
        const accessToken = Cookies.get("access_Token");
        const refreshToken = Cookies.get("refresh_Token");

        if (accessToken) {
            config.headers.accessToken = `${accessToken}`;

        } else if (!accessToken && refreshToken) {
            config.headers.refreshToken = `${refreshToken}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance;