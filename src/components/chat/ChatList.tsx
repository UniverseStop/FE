import { ChatType } from "@/types/propsTypes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import {useAuth} from "@/context/KakaoContext";

const Chat = () => {
    const router = useRouter();
    const auth = useAuth();
    console.log(auth)
    const chat = [

        {
            roomId: "dc8963ff-75d4-4df9-9b8b-3332054a25da",
            name: "바보",
            userCount: 0,
            titleImageUrl: "/images/littleduck-logo.png",
            participants: ["user"],
            lastMessage: "나는 땅콩이다",
            lastMessageSender: null,
            lastMessageSenderProfileImageUrl: null,
            lastMessageTime: null,
        },
        {
            roomId: "dc8963ff-75d4-4df9-9b8b-3332054a25db",
            name: "이응",
            userCount: 0,
            titleImageUrl: "/images/littleduck-logo.png",
            participants: ["user"],
            lastMessage: "나는 땅콩이다",
            lastMessageSender: null,
            lastMessageSenderProfileImageUrl: null,
            lastMessageTime: null,
        },
        {
            roomId: "dc8963ff-75d4-4df9-9b8b-3332054a25dc",
            name: "남궁민수",
            userCount: 0,
            titleImageUrl: "/images/littleduck-logo.png",
            participants: ["user"],
            lastMessage: "나는 땅콩이다",
            lastMessageSender: null,
            lastMessageSenderProfileImageUrl: null,
            lastMessageTime: null,
        },
    ];

    return (
        <main className='border-t border-[#EEE]'>
            {chat.map((item) => (
                <Link
                    href={`/chat/${item.roomId}`}
                    key={item.roomId}
                    className='flex flex-row items-center justify-between py-5 px-10 border-b border-[#EEE]'>
                    <div className='flex flex-row'>
                        <div className='flex items-center justify-center bg-[#F1F1F1] rounded-[50%] w-14 h-14'>
                            <Image width={50} height={50} src={item.titleImageUrl} alt='' />
                        </div>
                        <div className='flex flex-col justify-center px-5'>
                     .       <div className='flex flex-row items-center'>
                                <div className='text-base font-bold'>{item.name}</div>
                                {/*<div className='px-5 text-xs text-[#B1B1B1]'>{dayjs(user.Messages?.at(-1)?.createdAt).fromNow(true)}</div>*/}
                            </div>
                            <div className='text-[#7C7C7C] text-sm'>{item.lastMessage}</div>
                        </div>
                    </div>
                    <div>
                        <Image width={20} height={20} src='/images/trash.svg' alt='채팅삭제' />
                    </div>
                </Link>
            ))}
        </main>
    );
};

export default Chat;
