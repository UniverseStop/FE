import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ko";
import {useInfiniteQuery, InfiniteData } from "react-query";
import {getMessageList} from "@/pages/api/chat";
import {useInView} from "react-intersection-observer";
import {useEffect, useRef, useState} from "react";
import {useChat} from "@/hooks/useChat";
import {MessageType, ResponseData} from "@/types/chatTypes";
import { GetCurrentUser } from "@/utils/getCurrentUser";

dayjs.locale("ko");
dayjs.extend(relativeTime);
dayjs.extend(utc);

export default function Message() {
    const { realTimeMessage, roomIdQuery, isConnected } = useChat();
    const roomId = Array.isArray(roomIdQuery) ? roomIdQuery[0] : roomIdQuery || '';
    const [allMessageList, setAllMessageList] = useState<MessageType[]>([])
    const [today, setToday] = useState(dayjs());
    const userInfo = GetCurrentUser();
    const userId: string = userInfo.userId;

    // 무한 스크롤 (이전데이터)
    const scrollRef = useRef<HTMLDivElement>(null);
    const { data: prevMessageLists, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<ResponseData, InfiniteData<ResponseData>, any, any>({
        queryKey: ['chat', 'realTimeMessage', roomId],
        initialPageParams: 0,
        queryFn: ({ pageParam = 0 }) => getMessageList({ roomId, pageNum: pageParam }),
        getNextPageParam: (lastPage) => {
            if (lastPage && lastPage.content && lastPage.content.length > 0) {
                return lastPage.number + 1;
            }
            return undefined;
        },
    });

    console.log('realTimeMessage', realTimeMessage)

    // 이전메세지
    const prevMessages = prevMessageLists?.pages.map(page => page.data.content).flat().reverse();

    // 무한 스크롤 영역설정
    const {ref, inView} = useInView({
        threshold: 0,
        delay: 0,
    });

    // 메세지 결합처리
    useEffect(()=>{
        if (prevMessages) {
            setAllMessageList(prevMessages as MessageType[]);
        }
    }, [prevMessageLists]);

    useEffect(() => {
        if (realTimeMessage) {
            setAllMessageList(prev => [...prev, realTimeMessage as MessageType]);
        }
    }, [realTimeMessage]);

    // 날짜
    const formatDateOnly = (timeString: string) => {
        return dayjs(timeString).format('YYYY.MM.DD');
    };

    // 시간
    const formatTime = (timeString: string) => {
        const timeObj = timeString ? dayjs(timeString).utc().local() : dayjs();
        const date = dayjs(timeString).format("M월 D일");
        const sunset = timeObj.hour() >= 12 ? "PM" : "AM";
        const time = timeObj.format('HH:mm');
        return { sunset, date, time };
    };

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        if (inView) {
            !isFetching && hasNextPage && fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    useEffect(() => {
        scrollToBottom();
    }, [allMessageList]);


    useEffect(() => {
        scrollToBottom();
    }, []);

    console.log('allMessageList', allMessageList)

    return (
        <div ref={scrollRef} className="flex flex-col px-4 overflow-y-scroll flex-1">
            {/*<div ref={ref} style={{height: 50}}/>*/}
            {allMessageList?.map((item, index) => {
                const messageDate = formatDateOnly(item.createdAt as string);
                const { sunset, date, time } = formatTime(item.createdAt as string);
                let showDateHeader = false;
                if (index === 0 || formatDateOnly(allMessageList[index - 1].createdAt as string) !== messageDate) {
                    showDateHeader = true;
                }
                if (!item) return null;
                const isMyMessage = item.senderId ? item.senderId.toString() === userId : false;
                const messageKey = item.messageId || `${item.createdAt}-${item.senderId}-${index}`;

                return (
                    <>
                    { showDateHeader && ( <div className="text-center text-xs my-2">{`${messageDate}`}</div> )}
                        <div key={messageKey} className={`flex flex-col items-${isMyMessage ? 'end' : 'start'} mb-6`}>
                            <div className="flex flex-row gap-3">
                                {isMyMessage ? (
                                    <>
                                        <div className="flex items-end text-xs text-[#959595]">{time}</div>
                                        <div
                                            className="bg-[#BBA1A1] py-3 px-4 leading-5 rounded-bl-xl rounded-br-xl rounded-tl-xl">
                                            {item.message}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                       <div className="flex items-center mb-2">
                                         <img src={item.profileImageUrl} alt={`${item.sender}의 프로필 이미지`} className="w-12 h-12 object-cover rounded-3xl mr-1" />
                                       </div>
                                       <div>
                                            <div className="text-sm">{item.sender}</div>
                                            <div className="bg-[#F1F1F1] py-3 px-4 leading-5 rounded-bl-xl rounded-br-xl rounded-tr-xl">
                                            {item.message}
                                            </div>
                                        </div>
                                    <div className="flex items-end text-xs text-[#959595]">{time}</div>
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                );
            }
            )}
        </div>
    );
}