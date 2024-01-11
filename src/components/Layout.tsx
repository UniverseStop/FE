import React from "react";
import { useRouter } from "next/router";
import { LayoutProps } from "@/types/propsTypes";
import Nav from "./nav/Nav";

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter();
    const path: string = router ? router.asPath : ""; // 현재 주소 가져옴

    // Nav가 보이면 안되는 페이지 (aboutus, create-post)
    const isNotNav = ["/", "/create-post", "/users/login"].includes(path);

    return (
        <div className="max-w-[600px] min-w-[375px] mx-auto h-full">
            <div>{children}</div>
            <Nav isHide={!isNotNav}/>
        </div>
    );
};

export default Layout;