import React, { ReactNode } from "react";
import { LayoutProps } from "@/types/propsTypes";

const Layout = ({ children }: LayoutProps) => {
    return <div className='layout'>{children}</div>;
};

export default Layout;
