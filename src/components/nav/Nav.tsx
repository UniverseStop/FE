import React, { MouseEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { GetCurrentUser } from "@/utils/getCurrentUser";

const Nav = ({ isHide }: { isHide: boolean }) => {
    const router = useRouter();

    // 현재 로그인된 사용자 정보
    const userInfo = GetCurrentUser();
    const isLoggedIn = userInfo.isLoggedIn; // 로그인 유무

    // 로그인 후 이용할 수 있는 기능에 비로그인된 유저가 접근한 경우
    const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!isLoggedIn) {
            // isLoggedIn이 false이면서 링크를 클릭했을 때
            e.preventDefault(); // 기본 동작 막기
            alert("로그인 후 이용 가능합니다.");
            router.push("/users/login"); // 로그인 페이지로 이동
        }
    };

    return (
        <div>
            {isHide ? (
                <div className="border border-slate-300 fixed bottom-0 flex justify-between items-center  p-[20px] rounded-tl-[15px] rounded-tr-[15px] h-[50px] min-w-[375px] max-w-[600px] w-full box-border bg-white z-[999]">
                    <Link href="/main">
                        <Image src="/images/nav-home.png" alt="home" width={45} height={35} />
                    </Link>
                    <Link href="/search">
                        <Image src="/images/nav-search.png" alt="search" width={45} height={35} />
                    </Link>
                    <Link href={isLoggedIn ? "/create-post" : ""} onClick={handleLinkClick}>
                        <Image src="/images/nav-post.png" alt="create-post" width={45} height={35} />
                    </Link>
                    <Link href={isLoggedIn ? "/chat" : ""} onClick={handleLinkClick}>
                        <Image src="/images/nav-chat.png" alt="chat" width={45} height={35} />
                    </Link>
                    <Link href={isLoggedIn ? `/mypage/${userInfo.userId}` : ""} onClick={handleLinkClick}>
                        <Image src="/images/nav-profile.png" alt="profile" width={45} height={35} />
                    </Link>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Nav;
