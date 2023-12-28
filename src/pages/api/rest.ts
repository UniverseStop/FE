import axios from "axios";
// import { instance } from "./instance";
import Cookies from "js-cookie";

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// KakaoLogin
export const getKakaoLogin = async (KAKAO_CODE: string) => {
    try {
        const response = await instance.post(`/api/kakao?code=${KAKAO_CODE}`);
        // 토큰을 쿠키에 저장
        const accessToken = response.headers.authorization;
        const refreshToken = response.headers.refreshtoken;
        Cookies.set("access_Token", accessToken, { path: "/" });
        Cookies.set("refresh_Token", refreshToken, { path: "/" });
        // document.dispatchEvent(new CustomEvent("loginSuccess"));
        console.log("카카오 로그인 성공", response);
        return response.data;
    } catch (error) {
        // 로그인 에러 처리
        console.error("카카오 로그인 실패", error);
        throw error;
    }
};
