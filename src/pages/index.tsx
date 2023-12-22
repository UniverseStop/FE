import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/KakaoContext";

export default function Home() {
    const router = useRouter();
    const auth = useAuth();

    if (!auth) {
        return null;
    }

    const { userInfo, isLoggedIn, logout } = auth;

    const onLogin = () => {
        router.replace("/users/login");
    };

    console.log("userInfo", userInfo);
    console.log("isLoggedIn", isLoggedIn);
    console.log("logout", logout);

    return (
        <div>
            <div className='foolish'>남규 바보</div>
            {isLoggedIn ? (
                <button type='button' onClick={logout}>
                    로그아웃
                </button>
            ) : (
                <button type='button' onClick={onLogin}>
                    로그인
                </button>
            )}
        </div>
    );
}
