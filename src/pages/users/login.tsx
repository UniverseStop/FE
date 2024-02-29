import React from 'react';
import { useRouter } from 'next/router';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { useRecoilValue, useResetRecoilState } from "recoil";
import { blackUser } from "@/recoil/atoms/blackUser";
import Image from "next/image";

const LoginPage = () => {
    const router = useRouter();
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&prompt=login`;
    const onKakaoLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    };

    // 차단된 사용자인 경우
    const blackUserNickname = useRecoilValue(blackUser);
    const isBlack = blackUserNickname !== "";
    const reset = useResetRecoilState(blackUser); // recoil 저장소 초기화 (차단 유저)

    return  (
        <div className="gradation">
            {isBlack ? 
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-8 w-5/6 max-w-[515px] h-96 max-h-[360px] rounded-lg z-50 justify-center items-center flex">
                    <div className="flex flex-col items-center justify-center w-full">
                        <span className="text-2xl font-bold">차단된 사용자 입니다.</span>
                        <span><span className="text-mainColor">구제신청</span>을 하시겠습니까?</span>
                        <Image width={190} height={190} alt="blackLock" src="/images/blackLock.png"/>
                        <div className="w-5/6 h-[50px] space-x-4 text-xl flex items-center justify-center font-bold">
                            <button onClick={()=>reset()} className="text-mainColor border border-mainColor w-5/6 h-full rounded-2xl">취소하기</button>
                            <button onClick={()=>router.push("/salvation-application")} className="text-white bg-mainColor w-5/6 h-full rounded-2xl">신청하기</button>
                        </div>
                    </div>
                </div>   
            </div> 
            : <></>}
            <div className="sm:bg-login bg-loginMobile h-screen">
                <div className="text-base font-bold fixed bottom-20 left-1/2 flex flex-col space-y-5 transform -translate-x-1/2">
                    <button onClick={onKakaoLogin} className="text-black font-bold w-80 flex gap-4 bg-[#fef01b] hover:bg-[#fef01b]/90 rounded-3xl px-5 py-4 text-center items-center justify-between pr-[95px]"><RiKakaoTalkFill className="w-6 h-6"/>카카오로 로그인하기</button>
                    <button onClick={()=>router.push("/main")} style={{ background: "linear-gradient(to right, #9C3FE4, #C65647)" }} className="text-white w-80 flex gap-4 bg-[#9C3FE4] font-medium rounded-3xl px-5 py-4 text-center items-center justify-between pr-[135px]">
                        <img className="w-5 h-5" alt="tour" src="/images/tour.png" />
                        둘러보기
                    </button>
                </div>
            </div>
        </div>
    )
};

export default LoginPage;