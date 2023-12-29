import Chat from "@/components/chat/ChatList";
import ChatNav from "@/components/chat/ChatNav";
import Nav from "@/components/nav/Nav";
import { useAuth } from "@/context/KakaoContext";
import { useRouter } from "next/router";
import React from "react";
import {getRooms} from "@/pages/api/chat";


const ChatList = () => {
    const router = useRouter();
    const auth = useAuth();

    if (!auth) {
        return null;
    }

    // const rooms = await getRooms();

    return (
        <>
            <ChatNav />
            <Chat />
            <Nav />
        </>
    );
};

export default ChatList;
