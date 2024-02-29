import React, { MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useResetRecoilState } from "recoil";
import { currentUser } from "@/recoil/atoms/currentUser";
import { GetCurrentUser } from "@/utils/getCurrentUser";
import { removeCookie } from "@/utils/tokenUtils";

const Nav = ({ isHide }: { isHide: boolean }) => {
    const router = useRouter();
    const [buttonName, setButtonName] = useState("로그인");
    const [isActiveBoxVisible, setIsActiveBoxVisible] = useState<boolean>(false);

    const currentPath = router.pathname;

    // 현재 로그인된 사용자 정보
    const userInfo = GetCurrentUser();
    const isLoggedIn = userInfo.isLoggedIn; // 로그인 유무
    const isAdmin = userInfo.auth === "ADMIN" || userInfo.auth === "SUPER"; // 관리자 계정 유무
    const reset = useResetRecoilState(currentUser); // recoil 데이터 초기화

    // 로그인 후 이용할 수 있는 기능에 비로그인된 유저가 접근한 경우
    const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!isLoggedIn) {
            // isLoggedIn이 false이면서 링크를 클릭했을 때
            e.preventDefault(); // 기본 동작 막기
            alert("로그인 후 이용 가능합니다.");
            router.push("/users/login"); // 로그인 페이지로 이동
        }
        if (isActiveBoxVisible) {
            setIsActiveBoxVisible(false);
        }
    };

    const handleOpenActiveBox = () => {
        setIsActiveBoxVisible((prev)=>!prev)
    }

    const handleLoginLogout = () => {
        if (buttonName === "로그인") router.push("/users/login");
        else {
            removeCookie("access_Token");
            removeCookie("refresh_Token");
            reset();
            setButtonName("로그인");
            if (isActiveBoxVisible) setIsActiveBoxVisible(false);
            router.push("/users/login");
        }
    };

    useEffect(() => {
        if (userInfo.isLoggedIn) setButtonName("로그아웃");
        if (!userInfo.isLoggedIn) setButtonName("로그인");
    }, [userInfo.isLoggedIn]);

    return (
        <div>
            {isHide ? (
                <div className="border border-slate-300 fixed bottom-0 flex justify-between items-center  p-[20px] rounded-tl-[15px] rounded-tr-[15px] h-[50px] min-w-[375px] max-w-[600px] w-full box-border bg-white z-[999]">
                    <Link href="/main">
                        <Image className={currentPath == "/main" ? "brightness-50" : "hover:brightness-50"} src="/images/nav-home.png" alt="home" width={45} height={35} />
                    </Link>
                    <Link href="/search">
                        <Image className={currentPath == "/search" ? "brightness-50" : "hover:brightness-50"} src="/images/nav-search.png" alt="search" width={45} height={35} />
                    </Link>
                    <Link href={isLoggedIn ? "/create-post" : ""} onClick={handleLinkClick}>
                        <Image className={currentPath == "/create-post" ? "brightness-50" : "hover:brightness-50"} src="/images/nav-post.png" alt="create-post" width={45} height={35} />
                    </Link>
                    <Link href={isLoggedIn ? "/chat" : ""} onClick={handleLinkClick}>
                        <Image className={currentPath == "/chat" || currentPath == "/chat/[room]" ? "brightness-50" : "hover:brightness-50"} src="/images/nav-chat.png" alt="chat" width={45} height={35} />
                    </Link>
                    <button onClick={handleOpenActiveBox} className="relative">
                        <Image className={currentPath == "/mypage/[id]" ? "brightness-50" : "hover:brightness-50"} src="/images/nav-profile.png" alt="profile" width={45} height={35} />
                    </button>
                    {isActiveBoxVisible && (
                    <div className={`absolute bottom-[40px] right-[10px] w-[180px] ${isAdmin ? "h-[130px]" : "h-[90px]"} flex flex-col justify-center items-center border rounded-[10px] border-slate-300 bg-white`}>
                        <Link href={isLoggedIn ? `/mypage/${userInfo.userId}` : ""} onClick={handleLinkClick} className="block w-[170px] h-[40px] rounded-[10px] font-semibold text-center hover:no-underline hover:bg-[#efefef] hover:text-black text-[#989898] flex items-center justify-center">마이페이지 이동</Link>
                        {isLoggedIn && userInfo.auth === "ADMIN" || userInfo.auth === "SUPER" ?
                        <Link href="/manager" onClick={handleLinkClick} className="block w-[170px] h-[40px] rounded-[10px] font-semibold text-center hover:no-underline hover:bg-[#efefef] hover:text-black text-[#989898] flex items-center justify-center">관리자 페이지 이동</Link> : <></>}
                        <button onClick={handleLoginLogout} className="w-[170px] h-[40px] rounded-[10px] font-semibold text-center text-[#989898] hover:bg-[#efefef] hover:text-black">{buttonName}</button>
                    </div>
                 )}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Nav;
