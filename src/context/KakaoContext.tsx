import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import useParseJwt from "../hooks/useParseJwt";
import { AuthContextType } from "@/types/propsTypes";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
    const tokenFromCookie = Cookies.get("access_Token");
    const [token, setToken] = useState<any>(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const tokenUser = useParseJwt(tokenFromCookie);

    useEffect(() => {
        if (tokenFromCookie) {
            setToken(tokenFromCookie);
            setUserInfo(tokenUser);
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            setUserInfo(null);
        }
    }, [tokenFromCookie]);

    const updateToken = (newToken: any) => {
        Cookies.set("access_Token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        Cookies.remove("access_Token");
        Cookies.remove("refresh_Token");
        setToken(null);
        setUserInfo(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ token, updateToken, isLoggedIn, userInfo, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { userInfo, isLoggedIn, ...rest} = context;

    const isUserInfoValid = userInfo && userInfo.sub;

    return { userInfo, isLoggedIn: isLoggedIn && isUserInfoValid, ...rest };
};
