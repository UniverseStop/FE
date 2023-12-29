import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import {CompatClient, Stomp, StompSubscription} from '@stomp/stompjs';
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useAuth } from '@/context/KakaoContext';
import {Simulate} from "react-dom/test-utils";
import {MessageType} from "@/types/chatTypes";

export const useChat = () => {
    const auth = useAuth()
    const {userInfo} = auth;
    const router = useRouter();
    const roomIdQuery = router.query.room
    const token = Cookies.get('access_Token');
    const clientRef = useRef<any>({});
    const [stompClient, setStompClient] = useState<CompatClient | null>();
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [inputMessage, setInputMessage] = useState<any>("");

    let [client, changeClient] = useState(null);


    const unsubscribe = (subscription: StompSubscription) => {
        if (subscription) {
            subscription.unsubscribe();
        }
    };

    // 메시지 보내기
    const sendMessage = () => {
        if (clientRef.current && isConnected && inputMessage.trim() !== "") {
            console.log("Sending message:", inputMessage);
            try {
                clientRef.current.send(
                    "/pub/chat/message",
                    {Authorization: token},
                    JSON.stringify({ type: "TALK", roomId: roomIdQuery, message: inputMessage})
                );
                console.log("Message sent successfully:", inputMessage);
            } catch (error) {
                console.error("Error sending message:", error);
            }
            setInputMessage("");
        }
    };

    useEffect(() => {
        if (roomIdQuery && token && !isConnected) {
            // 클라이언트 초기화 및 연결
            const socket = new SockJS('http://43.201.7.171/ws-stomp');
            const client = Stomp.over(socket);

            client.connect(
                { Authorization: token },
                () => {
                    clientRef.current = client;
                    setIsConnected(true);
                    setStompClient(client);

                    // 구독 설정
                    client.subscribe(
                        `/sub/chat/room/${roomIdQuery}`,
                        (message: any) => {
                            if (message && message.body) {
                                let newMessage = JSON.parse(message.body);
                                setMessages(prevMessages => [...prevMessages, newMessage]);
                            }
                        },
                        { Authorization: token }
                    );
                },
                (error: any) => {
                    console.error('Connection error:', error);
                }
            );

            // 클라이언트 연결 해제
            return () => {
                if (client.connected) {
                    client.disconnect();
                    setIsConnected(false);
                }
            };
        }
    }, [roomIdQuery, token]);



    return { unsubscribe, isConnected, roomIdQuery, messages, sendMessage, inputMessage, setInputMessage };
};

