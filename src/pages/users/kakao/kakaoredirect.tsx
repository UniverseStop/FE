import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { getKakaoLogin } from "@/pages/api/rest";
import { useAuth } from "@/context/KakaoContext";

const KakaoRedirect = () => {
	const router = useRouter();
	const { code }: any = router.query;
	const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
	const [isLoginFailed, setIsLoginFailed] = useState(false);
	const [isLoginAttempted, setIsLoginAttempted] = useState(false);
	const auth = useAuth();
	const { userInfo } = auth;

	const loginMutation = useMutation(getKakaoLogin, {
		onSuccess: () => {
			setIsLoginSuccessful(true);
		},
		onError: () => {
			router.push("/");
			setIsLoginFailed(true);
		},
	});

	useEffect(() => {
		if (code && !isLoginAttempted) {
			loginMutation.mutate(code);
			setIsLoginAttempted(true);
		}
	}, [code, loginMutation]);

	useEffect(() => {
		// 초기세팅값이 들어있는 유저는 메인페이지로, 없다면 세팅페이지로 이동
		if (isLoginSuccessful && userInfo && !userInfo.age) {
			router.push("/userinfo-setting");
		} else if (isLoginSuccessful) {
			router.push("/main");
		}
	}, [isLoginSuccessful, router, userInfo]);

	if (!code) {
		return <div>Loading...</div>;
	}

	return <div />;
};

export default KakaoRedirect;
