import axios from "axios";
// import {instance} from "@/pages/api/instance";
import Cookies from "js-cookie";
import {Dispatcher} from "undici-types";
import {instance} from "@/pages/api/instance";

// export const instance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL,
// });

// 채팅 룸 리스트
export const getRooms = async ()  => {
    const res: Response = await instance.get(`${process.env.NEXT_PUBLIC_API_URL}/chat/rooms`)
    return res.data;
}

// 전체 체팅방 가져오기
// export const postTestRoom = async () => {
//     const token: string | undefined = Cookies.get("access_Token")
//     const res: Response = await instance.post(`${process.env.NEXT_PUBLIC_API_URL}/chat/room`)
//     if (!res.ok) {
//         throw new Error('Failed to fetch data')
//     }
//     return res.json()
// }

// 이전 메세지
export const getMessageList = async ({roomId, pageNum}: {roomId: string, pageNum: number}): Promise<ResponseData> => {
    try {
        const res = await instance.get(`${process.env.NEXT_PUBLIC_API_URL}/chat/${roomId}?page=${pageNum}`)
        return res.data;
    } catch (error) {
        console.error('Error fetching message list:', error);
        throw error;
    }
};