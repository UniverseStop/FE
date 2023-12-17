import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { AuthContextType } from "../../types/propsTypes";
import parseJwt from "./KakaoDecode";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
    const [token, setToken] = useState<any>(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    console.log(token);

    useEffect(() => {
        const handleLoginSuccess = () => {
            const tokenFromCookie = Cookies.get("access_Token");
            if (tokenFromCookie) {
                setToken(tokenFromCookie);
                setUserInfo(parseJwt(tokenFromCookie));
                setIsLoggedIn(true);
            }
        };

        document.addEventListener("loginSuccess", handleLoginSuccess);

        return () => {
            document.removeEventListener("loginSuccess", handleLoginSuccess);
        };
    }, []);

    const updateToken = (newToken: any) => {
        Cookies.set("token", newToken);
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

export const useAuth = () => useContext(AuthContext);
