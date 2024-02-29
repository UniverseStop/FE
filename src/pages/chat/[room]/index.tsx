import ChatForm from "@/components/chat/ChatForm";
import Message from "@/components/chat/Message";
import ChatNav from "@/components/chat/ChatNav";

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
