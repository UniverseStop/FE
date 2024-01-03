import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/KakaoContext";
import Nav from "@/components/nav/Nav";
import {credentialLogin} from "@/pages/api/rest";

export default function Home() {
    const router = useRouter();
    const auth = useAuth();

    if (!auth) {
        return null;
    }

    const { userInfo, isLoggedIn, logout } = auth;
    console.log(userInfo)

    const onLogin = () => {
        router.replace("/users/login");
    };

    console.log("userInfo", userInfo);
    console.log("isLoggedIn", isLoggedIn);
    console.log("logout", logout);

    return (
        <div>
            <div className='foolish'>남규 바보</div>
            <button onClick={credentialLogin}>테스트로그인</button>
            <p></p>
            {isLoggedIn ? (
                <button type='button' onClick={logout}>
                    로그아웃
                </button>
            ) : (
                <button type='button' onClick={onLogin}>
                    로그인
                </button>
            )}
            <Nav/>
        </div>
    );
}
