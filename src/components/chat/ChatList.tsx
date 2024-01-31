import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import {getRoomList} from "@/pages/api/chat";
import {useQuery} from "react-query";
import { GetCurrentUser } from "@/utils/getCurrentUser";

dayjs.locale('ko');
dayjs.extend(relativeTime)

//nav에 채팅 아이콘 누르면 들어와지는 페이지
//내가 구독한(참가 하고있는) 채팅방 리스트
const ChatList = () => {
    const router = useRouter();
    const userInfo = GetCurrentUser();
    const userId = userInfo.userId;

    const { data } = useQuery<string, number>({
        queryKey: ["chat", userId],
        queryFn: ()=>getRoomList(Number(userId)),
        staleTime: 60 * 1000,
    });

    console.log('data :>> ', data);

    return (
        <></>
        // <main className='border-t border-[#EEE]'>
        //     {data && data.map((item:any) => (
        //         <Link
        //             href={`/chat/${item.roomId}`}
        //             key={item.roomId}
        //             className='flex flex-row items-center justify-between py-5 px-10 border-b border-[#EEE]'>
        //             <div className='flex flex-row'>
        //                 <div className='flex items-center justify-center bg-[#F1F1F1] rounded-[50%] w-14 h-14'>
        //                     {item.titleImageUrl && (
        //                         <Image width={50} height={50} src={item.titleImageUrl} alt='' />
        //                     )}
        //                 </div>
        //                 <div className='flex flex-col justify-center px-5'>
        //                     <div className='flex flex-row items-center'>
        //                         <div className='text-base font-bold'>{item.name}</div>
        //                         {/*<div className='px-5 text-xs text-[#B1B1B1]'>{dayjs(user.Messages?.at(-1)?.createdAt).fromNow(true)}</div>*/}
        //                     </div>
        //                     <div className='text-[#7C7C7C] text-sm'>{item.lastMessage}</div>
        //                 </div>
        //             </div>
        //             <button>
        //                 <Image width={20} height={20} src='/images/trash.svg' alt='채팅삭제' />
        //             </button>
        //         </Link>
        //     ))}
        // </main>
    );
};

export default ChatList;