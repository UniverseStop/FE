import ChatForm from "@/components/chat/ChatForm";
import Message from "@/components/chat/Message";
import ChatNav from "@/components/chat/ChatNav";
import {useEffect} from "react";
import {useChat} from "@/hooks/useChat";

const ChatRoom = () => {
    return (
        <div className="h-screen flex flex-col items-stretch">
            <ChatNav />
            <Message  />
            <ChatForm />
        </div>

    )

};

export default ChatRoom;
