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

// export const getKakaoLogin = async (KAKAO_CODE: string) => {
//     try {
//         const response = await instance.post(`/api/kakao?code=${KAKAO_CODE}`);
//         const accessToken = response.headers.authorization;
//         const refreshToken = response.headers.refreshtoken;
//         Cookies.set("access_Token", accessToken, { path: "/" });
//         Cookies.set("refresh_Token", refreshToken, { path: "/" });
//         console.log("카카오 로그인 성공", response);
//         return response.data;
//     } catch (error) { // 로그인 에러 처리
//         throw error;
//     }
// };

// // test용 로그인
// export const credentialLogin = async () => {
//     try {
//         const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
//             nickname: "user", password: "user" ,
//         });
//         const accessToken = response.headers.authorization;
//         const refreshToken = response.headers.refreshtoken;
//         Cookies.set("access_Token", accessToken, { path: "/" });
//         Cookies.set("refresh_Token", refreshToken, { path: "/" });
//         console.log(response)
//         return response
//     } catch (error) {
//         console.error('Login error:', error);
//         throw error;
//     }
// }
