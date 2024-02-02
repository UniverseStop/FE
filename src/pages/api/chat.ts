import {instance} from "@/pages/api/instance";

// 구독한 채팅 전체리스트
export const getRoomList = async () => {
    try {
        const res = await instance.get(`/chat/rooms/user`);
        return res.data;
    } catch (error) {
        console.error('getRoomList Error:', error);
        throw error;
    }
};

// 이전 메세지 조회
export const getMessageList = async ({roomId, pageNum}: {roomId: string, pageNum: number}) => {
    try {
        const res = await instance.get(`/chat/${roomId}?page=${pageNum}`)
        return res;
    } catch (error) {
        console.error('getMessageList Error:', error);
        throw error;
    }
};

// 채팅방 삭제
export const deleteChatRoom = async (roomId : string) => {
    try {
        const res = await instance.delete(`/chat/room/post/${roomId}`)
        return res;
    } catch (error) {
        console.error('deleteChatRoom Error:', error);
        throw error;
    }
}