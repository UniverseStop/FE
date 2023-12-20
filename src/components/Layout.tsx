import React from "react";
import Nav from "./nav/Nav";
import { LayoutProps } from "@/types/propsTypes";
import style from "./layout.module.css";

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="max-w-[600px] min-w-[375px] mx-auto h-auto">
            <div>{children}</div>
        </div>
    );
};

export default Layout;
