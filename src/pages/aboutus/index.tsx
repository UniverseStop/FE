import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useResetRecoilState } from "recoil";
import ImageSlider from "@/components/aboutus/ImageSlider";
import { currentUser } from "@/recoil/atoms/currentUser";
import { removeSession } from "@/utils/removeSession";
import { GetCurrentUser } from "@/utils/getCurrentUser";
import { getSession } from "@/utils/getSession";
import Head from "next/head";

export default function AboutUs() {
    const router = useRouter();

    const [buttonName, setButtonName] = useState("로그인");
    const userInfo = GetCurrentUser(); // 현재 로그인된 사용자 정보
    const reset = useResetRecoilState(currentUser); // recoil 데이터 초기화

    const handleClickButto = () => {
        if (buttonName === "로그인") router.push("/users/login");
        else {
            // 로그아웃
            removeSession("access_Token");
            removeSession("refresh_Token");
            reset();
            setButtonName("로그인");
        }
    };

    useEffect(() => {
        // 브라우저 닫기 시 리코일 초기화
        const resetRecoil = () => {
            reset();
        };

        const token = getSession("access_Token");
        if (!token){
            resetRecoil();
        } else {
            if (userInfo.isLoggedIn) setButtonName("로그아웃");
            else {
                removeSession("access_Token");
                removeSession("refresh_Token");
            }
        }

        // beforeunload 이벤트에 대한 리스너 추가 (브라우저가 닫힐 때 실행 예정)
        window.addEventListener("beforeunload", resetRecoil);

        return () => {
            // 브라우저 닫기 시에만 초기화 되도록 beforeunload 이벤트에 등록된 리스너를 제거하여 함수 실행
            window.removeEventListener("beforeunload", resetRecoil);
        };
    }, []);

    return (
        <div>
            <Head>
                <meta name="description" content="유니버스 소개 페이지 입니다."></meta>
            </Head>
        <div className="gradation h-screen relative">
            <div className="bg-cover bg-[url('/images/aboutUs.png')] absolute top-0 left-0 w-full h-full" />
            <div className="relative">
                <div className="relative overflow-hidden">
                    <img className="absolute w-[55%] left-2/4 top-5" alt="planet" src="/images/planet.png" />
                    <div className="flex flex-col p-[30px] font-bold text-5xl text-white">
                        {["찾았다 🫣", "내가 내릴", "정거장"].map((item, index) => {
                            return (
                                <span className="mb-3 z-40" key={index}>
                                    {item}
                                </span>
                            );
                        })}
                    </div>
                </div>
                <div className="max-w-[600px] min-w-[375px]">
                    <ImageSlider />
                </div>
                <div>
                    <div className="fixed w-screen bottom-10 right-0">
                        <div className="relative overflow-hidden right-0 top-[330px] w-screen h-[500px] max-w-[600px] mx-auto">
                            <img className="absolute top-0 left-[-145px]" alt="earth" src="/images/earth.png" />
                        </div>
                    </div>
                    <div className="w-[70%] mx-auto">
                        <div className="fixed bottom-10 w-[70%] max-w-[410px] flex justify-between items-center font-bold text-3xl text-white">
                            <button className="z-40" onClick={() => handleClickButto()}>
                                {buttonName}
                            </button>
                            <button className="z-40" onClick={() => router.push("/main")}>
                                둘러보기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
