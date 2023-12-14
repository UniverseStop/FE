import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 쿠키를 읽어오는 함수
const getCookies = (): { [key: string]: string } => {
    const cookies = document.cookie;
    const cookieArray = cookies.split(";");
    const cookieObject: { [key: string]: string } = {};

    cookieArray.forEach((cookie) => {
        const [name, value] = cookie.trim().split("=");
        cookieObject[name] = value;
    });

    return cookieObject;
};

// 토큰을 헤더에 추가하는 함수
const addTokenToHeaders = (config: any, token: string | undefined, header: string) => {
    if (token) {
        config.headers[header] = token;
    }
};

// Auth
// KakaoLogin
export const getKakaoLogin = async (KAKAO_CODE: string) => {
    const response = await instance.post("/api/users/kakao", { code: KAKAO_CODE });
    document.cookie = `access_token=${response.headers.accesstoken}; path=/;`;
    document.cookie = `refresh_token=${response.headers.refreshtoken}; path=/`;
    console.log("카카오 로그인", response);
    return response.data;
};
