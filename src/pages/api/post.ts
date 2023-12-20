import axios from "axios";

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