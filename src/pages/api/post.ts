import { instance } from "./instance";

// 소게 페이지 랜덤 정류장 (10개)
export const getBusStopItems = async () => {
    try {
        const res = await instance.get("/api/post/random?size=10");
        return res.data.data;
    } catch (error) {
        throw error;
    }
};

// 메인페이지 정류장 작성글(무한스크롤)
export const getBusStopMainItems = async (page: number, queryString: string) => {
    try {
        const res = await instance.get(`/api/post?page=${page}${queryString}`);
        return res.data.data.content;
    } catch (error) {
        throw error;
    }
};

// 정류장 상세 정보
export const getBusStopDetail = async (postId: number) => {
    try {
        const res = await instance.get(`/api/post/${postId}`);
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

// 참가 신청
export const postChatApplication = async (postId: number) => {
    try {
        const res = await instance.post(`/api/post/${postId}/applicants`);
        return res;
    } catch (error) {
        throw error;
    }
};

// 참여자 승인
export const postChatApproval = async ({ postId, userId }: { postId: number; userId: number }) => {
    try {
        const res = await instance.post(`/api/post/${postId}/applicants/${userId}`);
        return res;
    } catch (error) {
        throw error;
    }
};

// 참여자 거절
export const postChatRefuse = async ({ postId, userId }: { postId: number; userId: number }) => {
    try {
        const res = await instance.delete(`/api/post/${postId}/applicants/${userId}`);
        return res;
    } catch (error) {
        throw error;
    }
};

// 게시글 등록
export const postBusStop = async (data: FormData) => {
    try {
        const res = await instance.post(`/api/post`, data, {
            headers: { "Context-Type": "multipart/form-data" },
        });
        return res;
    } catch (error) {
        console.log("postBusStop error", error);
    }
};
