import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/KakaoContext';
import { RiKakaoTalkFill } from 'react-icons/ri';

const LoginPage = () => {
    const auth = useAuth();
    const router = useRouter();

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&prompt=login`;

    useEffect(() => {
        if (auth.isLoggedIn) {
            router.back();
        }
    }, [auth, router]);

    const onKakaoLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    };

    // Render the login page only if not authenticated
    return !auth.isLoggedIn ? (
        <div className="gradation">
            <div className="sm:bg-login bg-loginMobile h-screen center center bg-no-repeat relative">
                <div className="text-base font-bold fixed bottom-20 left-1/2 flex flex-col space-y-5 transform -translate-x-1/2">
                    <button onClick={onKakaoLogin} className="text-black font-bold w-80 flex gap-4 bg-[#fef01b] hover:bg-[#fef01b]/90 rounded-3xl px-5 py-4 text-center items-center justify-between pr-[95px]"><RiKakaoTalkFill className="w-6 h-6"/>카카오로 로그인하기</button>
                    <button onClick={()=>router.push("/main")} style={{ background: "linear-gradient(to right, #9C3FE4, #C65647)" }} className="text-white w-80 flex gap-4 bg-[#9C3FE4] font-medium rounded-3xl px-5 py-4 text-center items-center justify-between pr-[135px]">
                        <img className="w-5 h-5" alt="tour" src="/images/tour.png" />
                        둘러보기
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default LoginPage;
