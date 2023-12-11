import React from "react";
import Nav from "./nav/Nav";
import { LayoutProps } from "@/types/propsTypes";
import style from "./layout.module.css";

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={style.layout}>
            <Nav />
            <div>{children}</div>
        </div>
    );
};

export default Layout;
