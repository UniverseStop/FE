import React from "react";
import { LayoutProps } from "@/types/propsTypes";

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="max-w-[600px] min-w-[375px] mx-auto h-full">
            <div>{children}</div>
        </div>
    );
};

export default Layout;