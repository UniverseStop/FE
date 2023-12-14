import React from "react";
import Nav from "./nav/Nav";
import { LayoutProps } from "@/types/propsTypes";
import style from "./layout.module.css";

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="layout bg-gradient-to-b from-[#201820] via-[#413e52] to-[#626093] max-w-[600px] min-w-[375px] mx-auto border h-screen">
            <Nav />
            <div>{children}</div>
        </div>
    );
};

export default Layout;
