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
        <div className='gradation'>
            <div className='bg-login h-screen center center bg-no-repeat relative'>
                <button
                    type='button'
                    onClick={onKakaoLogin}
                    className='fixed bottom-1/4 left-1/2 transform -translate-x-1/2 w-80 text-black flex gap-4 bg-[#fef01b] hover:bg-[#fef01b]/90 font-medium rounded-3xl px-5 py-4 text-center items-center justify-center'>
                    <RiKakaoTalkFill className='w-6 h-6' />
                    카카오로 로그인하기
                </button>
            </div>
        </div>
    ) : null;
};

export default LoginPage;
