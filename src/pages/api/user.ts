import Cookies from "js-cookie";
import axios from "axios";
import { instance } from "./instance";
import { NewEditDataType, NewSetDataType } from "@/types/myPageTypes";

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
		return response;
	} catch (error) {
		console.error("Login error:", error);
		throw error;
	}
};

//마이페이지
export const getMyPage = async (userId: Number) => {
	try {
		const response = await instance.get(`/api/mypage/${userId}`);
		return response.data.data;
	} catch (error) {
		console.error("getMyPage error:", error);
		throw error;
	}
};

//마이페이지 수정
export const putUserInfoEdit = async (data : NewEditDataType) => {
	try {
		const response = await instance.put(`/api/mypage/${data.userId}/nickname`, data.userEditSettings);
		return response;
	} catch (error) {
		console.error("putUserInfoEdit error", error);
		throw error;
	}
}

//내 정보 설정(최초 로그인시)
export const putUserInfoSet = async (data: NewSetDataType) => {
	try {
		const response = await instance.put(`/api/mypage/${data.userId}/detail`, data.userSettings);
		return response;
	} catch (error) {
		console.error("putUserInfoSet error:", error);
		throw error;
	}
};

//닉네임 중복확인
export const postConfirmNickname = async (userNickname: string) => {
	try {
		const response = await instance.post(`/api/mypage/nickname/check`, JSON.stringify({ nickname: userNickname }), {
			headers: { "Content-Type": "application/json" },
		});
		return response;
	} catch (error) {
		console.error("postConfirmNickname error:", error);
		throw error;
	}
};

//불순한 유저 신고하기
export const postReportUser = async ({userId , formdata} : {userId : string; formdata: FormData}) => {
	try {
		const response = await instance.post(`/user/report/${userId}`, formdata, {
			headers: { "Context-Type": "multipart/form-data" },
		});
		return response;
	} catch (error) {
		console.error("postReportUser error:", error);
		throw error;
	}
}

// 차단된 사용자 구제 신청하기
export const postSalvationApplication = async (formdata: FormData) => {
	try {
		const response = await instance.post("/api/salvation", formdata);
		return response;
	} catch (error) {
		throw error;
	}
}