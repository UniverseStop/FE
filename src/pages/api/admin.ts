import { instance } from "./instance";

// 소게 페이지 랜덤 정류장 (10개)
export const getUserList = async () => {
    try {
        const res = await instance.get("/user/userList");
        return res;
    } catch (error) {
        throw error;
    }
};