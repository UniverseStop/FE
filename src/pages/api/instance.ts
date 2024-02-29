import axios from "axios";
import { getCookie, setCookie } from "@/utils/tokenUtils";

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(
    function (config) {
        const accessToken = getCookie("access_Token");
		if (accessToken) config.headers.Authorization = accessToken;

        const refreshToken = getCookie("refresh_Token");
		if (refreshToken) config.headers.RefreshToken = refreshToken;

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// 토큰 갱신
instance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const { response } = error; // 디스트럭처링을 통해 response를 가져옵니다.

		if (!response) { // response가 없을 경우에 대한 예외 처리
			return Promise.reject(error);
		}

		const { status, headers } = response;
		if (status === 401) {
			const config = { ...error.config };
			const newToken = headers.authorization;
			if (newToken) {
				// 새로운 토큰 추가
				setCookie("access_Token", newToken);
                config.headers.Authorization = newToken;

				// 실패했던 기존 request 재시도
				return instance(config);
			}
		}

		return Promise.reject(error);
	}
);

export default instance;