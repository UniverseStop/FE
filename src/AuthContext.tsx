import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        // 쿠키에서 토큰을 읽어와서 상태에 저장
        const tokenFromCookie: any = Cookies.get("token");
        if (tokenFromCookie) {
            setToken(tokenFromCookie);
        }
    }, []);

    const updateToken = (newToken: any) => {
        Cookies.set("token", newToken);
        setToken(newToken);
    };

    return <AuthContext.Provider value={{ token, updateToken }}>{children}</AuthContext.Provider>;
};
