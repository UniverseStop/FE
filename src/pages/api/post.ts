import axios from "axios";
import exp from "constants";

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 소게 페이지 랜덤 정류장 (10개)
export const getPostItems = async () => {
    try {
        const res = await instance.get("/api/post/random?size=10");
        return res.data.data;
    } catch (error) {
        throw error;      
    }
};

// 정류장 상세 정보
export const getPostDetail = async (postId: number) => {
    try {
        const res = await instance.get(`/api/post/${postId}`)
        return res.data.data;
    } catch (error) {
        throw error; 
    }
};

// 게시물 삭제
export const deletePost = async (postId: number) => {
    try {
        const res = await instance.delete(`/api/post/${postId}`)
        return res;
    } catch (error) {
        throw error;
    }
};