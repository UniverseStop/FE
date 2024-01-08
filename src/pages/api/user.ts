import Cookies from "js-cookie";
import axios from "axios";
import { instance } from "./instance";
import { FirstSetUserInfoType } from "@/types/myPageTypes";

export const credentialLogin = async () => {
	try {
		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
			nickname: "user",
			password: "user",
		});
		const accessToken = response.headers.authorization;
		const refreshToken = response.headers.refreshtoken;
		Cookies.set("access_Token", accessToken, { path: "/" });
		Cookies.set("refresh_Token", refreshToken, { path: "/" });
		// console.log(response)
		return response;
	} catch (error) {
		console.error("Login error:", error);
		throw error;
	}
};

//마이페이지
export const getMyPage = async (userId: Number) => {
	const response = await instance.get(`/api/mypage/${userId}`);
	return response.data;
};

//내 정보 설정(최초 로그인시)
export const putUserInfoSet = async (userInfo: FirstSetUserInfoType) => {
	const response = await instance.put(`api/mypage/detail`, userInfo);
    return response;
};
