import { useRouter } from "next/router";
import { GetCurrentUser } from "./getCurrentUser";
import { useEffect } from "react";

export function ConfirmPermissions() {
    // 사용자 로그인 유무 확인 후 접근 제한
    const userInfo = GetCurrentUser(); // 현재 로그인된 사용자 정보
    const isLoggedIn = userInfo.isLoggedIn;
    const router = useRouter();
    useEffect(()=>{
        if (!isLoggedIn) {
            alert("로그인이 필요한 페이지입니다.");
			router.push("/users/login");
        }
    });
}