import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { getKakaoLogin } from "../api/rest";

const KakaoRedirect = () => {
    const router = useRouter();
    const { code }: any = router.query;

    const loginMutation = useMutation(getKakaoLogin, {
        onSuccess: () => {
            router.push("/");
        },
    });

    useEffect(() => {
        if (code) {
            loginMutation.mutate(code);
        }
    }, [code, loginMutation]);

    if (!code) {
        return <div>Loading...</div>;
    }

    return <div />;
};

export default KakaoRedirect;
