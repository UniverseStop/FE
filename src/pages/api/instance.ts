import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(
    (config) => {
        const accessToken =
            document.cookie &&
            document.cookie
                .split(";")
                .filter((cookies) => cookies.includes("access_Token"))[0]
                ?.split("=")[1];
        const refreshToken =
            document.cookie &&
            document.cookie
                .split(";")
                .filter((cookies) => cookies.includes("refresh_Token"))[0]
                ?.split("=")[1];
        if (accessToken) config.headers.authorization = accessToken;
        if (!accessToken && refreshToken) config.headers.refresh = refreshToken;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
    (response) => {
        if (response.headers.authorization) {
            const expiresTime = new Date();
            expiresTime.setMinutes(expiresTime.getMinutes() + 30);
            document.cookie = `access_Token=${
                response.headers.authorization
            }; expires=${expiresTime.toUTCString()}; path=/;`;
        }
        if (response.headers.refreshtoken) {
            const expiresTime = new Date();
            expiresTime.setDate(expiresTime.getDate() + 14);
            document.cookie = `refresh_Token=${
                response.headers.refreshtoken
            }; expires=${expiresTime.toUTCString()}; path=/;`;
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
