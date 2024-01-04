import React, {FormEvent, KeyboardEventHandler, useState} from 'react';
import TextareaAutosize from "react-textarea-autosize";
import Image from "next/image";
import {useChat} from "@/hooks/useChat";

const ChatForm = () => {
    const { sendMessage, inputMessage, setInputMessage } = useChat()
    const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputMessage(e.target.value);
    };

    const onEnter: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (inputMessage?.trim()) {
                sendMessage();
                setInputMessage('');
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputMessage?.trim()) {
            sendMessage();
            setInputMessage('');
        }
    };


    return (
        <div className="flex items-center mb-8">
            <form className="my-[4px] mx-[12px]  flex gap-5 items-center w-full" onSubmit={handleSubmit}>
                <button className="hover:brightness-110" type="submit" disabled={!inputMessage?.trim()}>
                    <Image width={25} height={25} src="/images/chat-add-file.svg" alt="button"/>
                </button>
                <TextareaAutosize value={inputMessage} onChange={onChangeContent} onKeyDown={onEnter}
                                  className="h-10 w-full bg-transparent outline-0 rounded-full border px-4 py-2 flex-1 resize-none"
                                  placeholder="새 쪽지 작성하기"/>
                <button className="hover:brightness-110" type="submit" disabled={!inputMessage?.trim()}>
                    <Image width={25} height={25} src="/images/chat-send-button.svg" alt="button"/>
                </button>
            </form>
        </div>
    );
};

export default ChatForm;