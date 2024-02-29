import { useRecoilValue } from "recoil";
import { currentUser } from "@/recoil/atoms/currentUser";

export function GetCurrentUser() {
    const userInfo = useRecoilValue(currentUser);
    return userInfo;
}