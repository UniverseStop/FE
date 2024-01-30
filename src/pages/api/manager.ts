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

// 유저별 신고 내역 조회
export const getUserReport = async (userId: number) => {
    try {
        const res = await instance.get(`/user/reportList/${userId}`);
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

// 사용자 차단
export const postBlackUser = async (userId: number) => {
    try {
        const res = await instance.post(`/user/black/${userId}`);
        return res;
    } catch (error) {
        throw error;
    }
};

// 사용자 구제 신청 사유 가져오기
export const getSalvationReason = async (userId: number) => {
    try {
        const res = await instance.get(`/api/salvation/${userId}`);
        return res.data.data;
    } catch (error) {
        throw error;
    }
};

// 사용자 구제
export const postSalvationUser = async (userId: number) => {
    try {
        const res = await instance.post(`/user/user/${userId}`);
        return res;
    } catch (error) {
        throw error;
    }
};

// 사용자 통계
export const getStatic = async () => {
    try {
        const res = await instance.get(`/api/static`);
        console.log("res", res);
        return res.data.data;
    } catch (error) {
        throw error;
    }
};

// 정류장 위치 통계
export const getStaticLocation = async () => {
    try {
        const res = await instance.get(`/api/static/location`);
        console.log("StaticLocation", res);
        return res.data;
    } catch (error) {
        throw error;
    }
};
