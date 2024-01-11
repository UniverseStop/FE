import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import style from "./nav.module.css";
import Image from "next/image";

const Nav = () => {
    const router = useRouter();

    return (
        <div className="fixed bottom-0 flex justify-between items-center border p-[20px] rounded-tl-[15px] rounded-tr-[15px] h-[61px] w-[598px] box-border bg-white z-[999]">
            <Link href="/">
                <Image src="/images/nav-home.svg" alt="home" width={30} height={30} />
            </Link>
            <Link href="/search">
                <Image src="/images/nav-search.svg" alt="search" width={35} height={35} />
            </Link>
            <Link href="/create-post">
                <Image src="/images/nav-post.svg" alt="create-post" width={34} height={34} />
            </Link>
            <Link href="/chat">
                <Image src="/images/nav-chat.svg" alt="chat" width={32} height={32} />
            </Link>
            <Link href="/profile">
                <Image src="/images/nav-profile.svg" alt="profile" width={32} height={32} />
            </Link>
        </div>
    );
};

export default Nav;
