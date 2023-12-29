import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import dayjs from "dayjs";
import {useInfiniteQuery} from "react-query";
import {getMessageList} from "@/pages/api/chat";
import {useInView} from "react-intersection-observer";
import {useEffect, useRef, useState} from "react";
import {useChat} from "@/hooks/useChat";
import {useAuth} from "@/context/KakaoContext";
import {MessageType, ResponseData} from "@/types/chatTypes";

dayjs.locale('ko');
dayjs.extend(relativeTime)




export default function Message({ roomId }: { roomId: string }) {
    const { messages, isConnected } = useChat();
    const [combMessages, setCombMessages] = useState<MessageType[]>([])
    const auth = useAuth();
    const {userInfo} = auth;
    const scrollRef = useRef<HTMLDivElement>();
    const { data: messagesList, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<ResponseData, Error, ResponseData>({
        queryKey: ['chat', 'messages', roomId],
        queryFn: ({ pageParam = 0 }) => getMessageList({ roomId, pageNum: pageParam }),
        getNextPageParam: (lastPage) => {
            if (lastPage && lastPage.data && lastPage.data.content.length > 0) {
                return lastPage.data.number + 1;
            }
            return undefined;
        },
    });

    useEffect(() => {
        const newMessages = [...(messagesList?.pages.flatMap(page => page.content).reverse() || []), ...messages];
        setCombMessages(newMessages);
    }, [messages, messagesList]);

    const {ref, inView} = useInView({
        threshold: 0,
        delay: 0,
    });

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [combMessages]);

    useEffect(() => {
        if (inView) {
            !isFetching && hasNextPage && fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    useEffect(() => {
        scrollToBottom();
    }, []);

    return (
        <div ref={scrollRef} className="flex flex-col px-4 overflow-y-scroll flex-1">
            <div ref={ref} style={{height: 50,}}/>
            {combMessages.map((message, index) => {
                const isMyMessage = message.senderId == userInfo.userId;
                const messageKey = message.messageId || `${message.createdAt}-${message.senderId}-${index}`;
                return (
                    <>
                        <div key={messageKey} className={`flex flex-col items-${isMyMessage ? 'end' : 'start'} mb-6`}>
                            <div className="flex flex-row gap-3">
                                {isMyMessage ? (
                                    <>
                                        <div className="flex items-end text-xs text-[#959595]">시간</div>
                                        <div
                                            className="bg-[#BBA1A1] py-3 px-4 leading-5 rounded-bl-xl rounded-br-xl rounded-tl-xl">
                                            {message.message}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className="bg-[#F1F1F1] py-3 px-4 leading-5 rounded-bl-xl rounded-br-xl rounded-tr-xl">
                                            {message.message}
                                        </div>
                                        <div className="flex items-end text-xs text-[#959595]">시간</div>
                                    </>
                                )}
                            </div>
                        </div>

                    </>
                );
            })
            }

        </div>
    );

}
