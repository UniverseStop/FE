import {instance} from "@/pages/api/instance";

// // 채팅 룸 리스트(전체 목록 테스팅용!)
// export const getRooms = async () => {
//     const roomsResponse = await instance.get(`${process.env.NEXT_PUBLIC_API_URL}/chat/rooms`);
//     return roomsResponse.data;
// }




// // 이전 메세지
// export const getMessageList = async ({roomId, pageNum}: {roomId: string, pageNum: number}) => {
//     try {
//         const messageListResponse = await instance.get(`${process.env.NEXT_PUBLIC_API_URL}/chat/${roomId}?page=${pageNum}`)
//         return messageListResponse.data;
//     } catch (error) {
//         console.error('Error fetching message list:', error);
//         throw error;
//     }
// };

// 구독한 채팅 전체리스트
export const getRoomList = async (userId: number) => {
    try {
        const res = await instance.get(`/chat/rooms/${userId}`);
        return res.data;
    } catch (error) {
        throw error;
    }
};



// 이전 메세지 조회
export const getMessageList = async ({roomId, pageNum}: {roomId: string, pageNum: number}) => {
    try {
        const res = await instance.get(`/chat/${roomId}?page=${pageNum}`)
        return res;
    } catch (error) {
        console.error('Error fetching message list:', error);
        throw error;
    }
};