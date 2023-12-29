import axios from "axios";
import Cookies from "js-cookie";

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// KakaoLogin
export const getKakaoLogin = async (KAKAO_CODE: string) => {
    try {
        const response = await instance.post(`/api/kakao?code=${KAKAO_CODE}`);

        // 토큰을 쿠키에 저장
        const accessToken = decodeURIComponent(response.headers.authorization);
        const refreshToken = response.headers.refreshtoken;
        Cookies.set("access_Token", accessToken, { path: "/" });
        Cookies.set("refresh_Token", refreshToken, { path: "/" });
        return response.data;
    } catch (error) { // 로그인 에러 처리
        throw error;
    }
};
