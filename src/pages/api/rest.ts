import { instance } from "@/pages/api/instance";
import { saveSession } from "@/utils/saveSession";

// KakaoLogin
export const getKakaoLogin = async (KAKAO_CODE: string) => {
	try {
		const response = await instance.post(`/api/kakao?code=${KAKAO_CODE}`);
		const accessToken = response.headers.authorization;
		if (accessToken) saveSession("access_Token", accessToken);

		const refreshToken = response.headers.refreshtoken;
		if (refreshToken) saveSession("refresh_Token", refreshToken);

		return response.data;
	} catch (error) {
		// 로그인 에러 처리
		throw error;
	}
};