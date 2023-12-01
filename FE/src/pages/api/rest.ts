import axios from "axios";

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Auth
// KakaoLogin
export const kakaoLogin = async (accessToken: any) => {
	try {
		const response = await instance.post("/", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error("Error sending user data to backend", error);
	}
};

export default instance;
