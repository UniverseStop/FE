import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { getKakaoLogin } from "@/pages/api/rest";

const KakaoRedirect = () => {
    const router = useRouter();
    const { code }: any = router.query;
    const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
    const [isLoginAttempted, setIsLoginAttempted] = useState(false);

    const loginMutation = useMutation(getKakaoLogin, {
        onSuccess: () => {
            setIsLoginSuccessful(true);
        },
    });

    useEffect(() => {
        if (code && !isLoginAttempted) {
            loginMutation.mutate(code);
            setIsLoginAttempted(true); // 로그인 시도 상태 업데이트
        }
    }, [code, loginMutation]);

    useEffect(() => {
        if (isLoginSuccessful) {
            router.push("/"); // 로그인 성공 시 메인 페이지로 이동
        }
    }, [isLoginSuccessful, router]);

    if (!code) {
        return <div>Loading...</div>;
    }

    return <div />;
};

export default KakaoRedirect;
