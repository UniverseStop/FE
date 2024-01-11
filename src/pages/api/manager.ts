import { instance } from "./instance";

// 전체 사용자 조회 (차단된 사용자 제외)
export const getUserList = async (pageNum: number) => {
    try {
        const res = await instance.get(`/user/userList?page=${pageNum}`);
        return res.data.data;
    } catch (error) {
        throw error;
    }
};

// 차단된 사용자 전체 조회
export const getBlackUserList = async (pageNum: number) => {
    try {
        const res = await instance.get(`/user/blackUser?page=${pageNum}`);
        return res.data.data;
    } catch (error) {
        throw error;
    }
};

// 전체 모임장소 위치 조회
export const getPostLocationStatic = async () => {
    try {
        const res = await instance.get(`/api/static`);
        return res.data;
    } catch (error) {
        throw error;
    }
};
