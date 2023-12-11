import React from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
import { signIn, useSession } from "next-auth/react";
import { useMutation } from "react-query";

const LoginPage = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code`;

    const onKakaoLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    };

    return (
        <>
            <div>api</div>
            <button
                type='button'
                onClick={onKakaoLogin}
                className='text-black flex gap-4 bg-[#fef01b] hover:bg-[#fef01b]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center'>
                <RiKakaoTalkFill className='w-6 h-6' />
                Sign in With Kakao
            </button>
            <div>next-auth</div>
            <button
                type='button'
                onClick={() => signIn("kakao", { callbackUrl: "/" })}
                className='text-black flex gap-4 bg-[#fef01b] hover:bg-[#fef01b]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center'>
                <RiKakaoTalkFill className='w-6 h-6' />
                Sign in With Kakao
            </button>
        </>
    );
};

export default LoginPage;
