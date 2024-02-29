import Image from "next/image";
import Link from "next/link";
import {deleteChatRoom, getRoomList} from "@/pages/api/chat";
import {useMutation, useQuery, useQueryClient} from "react-query";
import { GetCurrentUser } from "@/utils/getCurrentUser";
import { ChatType } from "@/types/chatTypes";
import { formatTime } from "@/utils/formatTime";
import { getTruncateText } from "@/utils/getTruncateText";

//nav에 채팅 아이콘 눌렀을 때 페이지 - 내가 구독한 채팅방 전체리스트
const ChatList = () => {
    const userInfo = GetCurrentUser();
    const userId = userInfo.userId;
    const queryClient = useQueryClient();

    const { data : subscribeChatRoomList } = useQuery<ChatType[], number>({
        queryKey: ["chat", userId],
        queryFn: ()=>getRoomList(),
        staleTime: 60 * 1000,
    });

 //채팅방 삭제
 const deleteChatRoomMutation = useMutation(deleteChatRoom, {
    onSuccess: () => {
        queryClient.invalidateQueries(["chat", userId])
        },
    onError: () => {
          alert("오류가 발생하였습니다");
        },
 })

 const handleDeleteChatRoom = (roomId:string, e: React.MouseEvent) => {
    //Link 태그의 클릭이벤트가 버블되지 않도록 처리
    e.preventDefault();
    e.stopPropagation();
    deleteChatRoomMutation.mutate(roomId)
    };

    //마지막 보낸 메세지를 기준으로 내림차순으로 정렬, 가장최근에 대화한 채팅방이 맨 위에 오도록 정렬
 const sortedChatRoomList = subscribeChatRoomList?.sort((a, b) => {
     const timeA = a.lastMessageTime ? new Date(a.lastMessageTime).getTime() : 0;
     const timeB = b.lastMessageTime ? new Date(b.lastMessageTime).getTime() : 0;
     return timeB - timeA;
    });

    return (
        <main className='border-t border-[#EEE]'>
            {sortedChatRoomList && sortedChatRoomList.map((item:ChatType) => (
                <Link
                    href={`/chat/${item.roomId}`}
                    key={item.roomId}
                    className='flex flex-row items-center justify-between py-5 px-10 border-b border-[#EEE]
                    hover:bg-[rgba(0,5,0,0.1)] hover:no-underline'>
                    <div className='flex flex-row'>
                        <div className='flex items-center justify-center bg-[#F1F1F1] rounded-full w-[60px] h-[60px]'>
                            {item.titleImageUrl && (
                                <Image className="rounded-full w-[60px] h-[60px] object-cover" width={50} height={50} src={item.titleImageUrl} alt='' />
                            )}
                        </div>
                        <div className='flex flex-col justify-center px-5 sm:w-[350px] w-[260px]'>
                            <div className='flex flex-row items-center'>
                                <div className='text-base font-bold'>{item.name}</div>
                                <div className='pl-3 text-xs text-[#B1B1B1]'>{item.lastMessageTime ? formatTime(item.lastMessageTime) : null}</div>
                            </div>
                            <div className='text-[#7C7C7C] text-sm'>{item.lastMessage && getTruncateText(item.lastMessage,30)}</div>
                        </div>
                    </div>
                    <button onClick={(e) => handleDeleteChatRoom(item.roomId, e)} className="hover:brightness-50">
                    <Image width={20} height={20} src='/images/trash.svg' alt='채팅삭제' />
                    </button>
                </Link>
            ))}
            <div className="h-[100px]"></div>
        </main>
    );
};

export default ChatList;