import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { getKakaoLogin } from "@/pages/api/rest";

const KakaoRedirect = () => {
    const router = useRouter();
    const { code }: any = router.query;
    const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
    const [isLoginFailed, setIsLoginFailed] = useState(false);
    const [isLoginAttempted, setIsLoginAttempted] = useState(false);

    const loginMutation = useMutation(getKakaoLogin, {
        onSuccess: () => {
            setIsLoginSuccessful(true);
        },
        onError: () => {

            router.push('/');
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
        if (isLoginSuccessful) {
            router.push("/");
        }
    }, [isLoginSuccessful, router]);

    if (!code) {
        return <div>Loading...</div>;
    }

    return <div />;
};

export default KakaoRedirect;
