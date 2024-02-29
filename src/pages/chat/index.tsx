import ChatList from "@/components/chat/ChatList";
import ChatNav from "@/components/chat/ChatNav";
import { useRouter } from "next/router";
import React from "react";
import { ConfirmPermissions } from "@/utils/confirmPermissions";


const ChatListPage = () => {
    const router = useRouter();

    ConfirmPermissions(); //로그인 후 이용가능한 페이지


    return (
        <>
            <ChatNav />
            <ChatList />
        </>
    );
};

export default ChatListPage;
