import React, {KeyboardEventHandler, useState} from 'react';
import TextareaAutosize from "react-textarea-autosize";
import Image from "next/image";
import {useChat} from "@/hooks/useChat";

const ChatForm = () => {
    const { sendMessage, inputMessage, setInputMessage } = useChat();
    const [isComposing, setIsComposing] = useState(false);

    const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputMessage(e.target.value);
    };

    const handleComposition = (e: React.CompositionEvent<HTMLTextAreaElement>) => {
        if (e.type === 'compositionend') {
            setIsComposing(false);
            setInputMessage(e.currentTarget.value);
        } else {
            setIsComposing(true);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputMessage?.trim()) {
            sendMessage();
            setInputMessage('');
        }
    };

    const onEnter: KeyboardEventHandler<HTMLTextAreaElement> = async (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="flex items-center mb-8">
            <form className="my-[4px] mx-[12px] flex gap-5 items-center w-full" onSubmit={handleSubmit}>
                <button className="hover:brightness-110" type="submit" disabled={!inputMessage?.trim()}>
                    <Image width={25} height={25} src="/images/chat-add-file.svg" alt="button"/>
                </button>
                <TextareaAutosize value={inputMessage} onChange={onChangeContent}
                                  onCompositionStart={handleComposition}
                                  onCompositionEnd={handleComposition}
                                  onKeyDown={onEnter}
                                  maxLength={1500}
                                  rows={1}
                                  className="max-h-[100px] h-10 w-full bg-transparent outline-0 rounded-2xl border px-4 py-2 flex-1 resize-none"
                                  placeholder="새 쪽지 작성하기"/>
                <button className="hover:brightness-110" type="submit" disabled={!inputMessage?.trim()}>
                    <Image width={25} height={25} src="/images/chat-send-button.svg" alt="button"/>
                </button>
            </form>
            <div className="h-[150px]"></div>
        </div>
    );
};

export default ChatForm;