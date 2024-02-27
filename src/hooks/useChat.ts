import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Stomp, StompSubscription} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {MessageType} from "@/types/chatTypes";
import { getCookie } from "@/utils/tokenUtils";

export const useChat = () => {
    const router = useRouter();
    const roomIdQuery = router.query.room
    const token = getCookie("access_Token");
    const clientRef = useRef<any>({});
    const [isConnected, setIsConnected] = useState(false);
    const [realTimeMessage, setRealTimeMessage] = useState<MessageType[]>([]);
    const [inputMessage, setInputMessage] = useState<any>("");


    // 구독취소
    const unsubscribe = (subscription: StompSubscription) => {
        if (subscription) {
            subscription.unsubscribe();
        }
    };

    // 메시지 보내기
    const sendMessage =  () => {
        if (clientRef.current && isConnected && inputMessage.trim() !== "") {
            try {
                 clientRef.current.send(
                    "/pub/chat/message",
                    {Authorization: token},
                    JSON.stringify({ type: "TALK", roomId: roomIdQuery, message: inputMessage})
                );
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    useEffect(() => {
        let client: any;

        const connectStompClient = () => {
            if (!roomIdQuery || !token || isConnected) return;
            // SockJS 객체 생성
            const socket = new SockJS("http://3.37.62.9:8080/ws-stomp");
            client = Stomp.over(socket);
            client.connect(
                { Authorization: token },
                () => {
                    // 연결 성공 시 실행되는 콜백 함수
                    clientRef.current = client;
                    setIsConnected(true);
                    // 구독 설정
                    client.subscribe(
                        `/sub/chat/room/${roomIdQuery}`,
                        (message:any) => {
                            if (message && message.body) {
                                let newMessage = JSON.parse(message.body);
                                setRealTimeMessage(newMessage);
                            }
                        },
                        { Authorization: token }
                    );
                },
                // 연결 실패 시 실행되는 콜백 함수
                (error:any) => {
                    console.error("Connection error:", error);
                    setTimeout(connectStompClient, 5000); // 연결 실패 시 5초 후 재연결 시도
                }
            );
        };
        connectStompClient();


        // 클라이언트 연결 해제 로직
        return () => {
            if (client && client.connected) {
                client.disconnect();
            }
        };
    }, [roomIdQuery, token]);


    return { unsubscribe, isConnected, roomIdQuery, realTimeMessage, sendMessage, inputMessage, setInputMessage };
};