import axios from "axios";
import exp from "constants";

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 소게 페이지 랜덤 정류장 (10개)
export const getBusStopItems = async () => {
    try {
        const res = await instance.get("/api/post/random?size=10");
        return res.data.data;
    } catch (error) {
        throw error;      
    }
};

// 정류장 상세 정보
export const getBusStopDetail = async (postId: number) => {
    try {
        const res = await instance.get(`/api/post/${postId}`)
        return res.data.data;
    } catch (error) {
        throw error; 
    }
};

// 게시물 삭제
export const deleteBusStop = async (postId: number) => {
    try {
        const res = await instance.delete(`/api/post/${postId}`);
        return res;
    } catch (error) {
        throw error;
    }
};

// 참여자 승인
export const postChatApproval = async ({postId, userId}: {postId: number, userId: number}) => {
    try {
        const res = await instance.post(`/api/post/${postId}/applicants/${userId}`);
        return res;
    } catch (error) {
        throw error;
    }
};