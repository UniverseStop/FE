import React, { MouseEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/KakaoContext";

const Nav = ({isHide}: {isHide: boolean}) => {
    const router = useRouter();

    // 현재 로그인된 사용자 정보
    const { userInfo, isLoggedIn } = useAuth();

    // 로그인 후 이용할 수 있는 기능에 비로그인된 유저가 접근한 경우
    const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!isLoggedIn) { // isLoggedIn이 false이면서 링크를 클릭했을 때
          e.preventDefault(); // 기본 동작 막기
          alert("로그인 후 이용 가능합니다.");
          router.push("/users/login"); // 로그인 페이지로 이동
        }
    };

    return (
        <div>
            {isHide ? <div className="z-[100] fixed bottom-0 flex justify-between items-center border p-[20px] rounded-tl-[15px] rounded-tr-[15px] h-[61px] w-[598px] box-border bg-white z-[999]">
                <Link href="/main">
                    <Image src="/images/nav-home.svg" alt="home" width={30} height={30} />
                </Link>
                <Link href="/search">
                    <Image src="/images/nav-search.svg" alt="search" width={35} height={35} />
                </Link>
                <Link href={isLoggedIn ? "/create-post" : ""} onClick={handleLinkClick}>
                    <Image src="/images/nav-post.svg" alt="create-post" width={34} height={34} />
                </Link>
                <Link href={isLoggedIn ? "/chat" : ""} onClick={handleLinkClick}>
                    <Image src="/images/nav-chat.svg" alt="chat" width={32} height={32} />
                </Link>
                <Link href={isLoggedIn ? `/mypage/${userInfo.userId}` : ""} onClick={handleLinkClick}>
                    <Image src="/images/nav-profile.svg" alt="profile" width={32} height={32} />
                </Link>
            </div>: <></>}
        </div>
    );
};

export default Nav;
