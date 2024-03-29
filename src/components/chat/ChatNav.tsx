import { useRouter } from "next/router";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";

const ChatNav = () => {
    const router = useRouter();
    const onBackButtonHandler = () => {
        router.back();
    };

    return (
        <div>
            <IoMdArrowBack size={50} className='p-3 cursor-pointer' onClick={onBackButtonHandler} />
        </div>
    );
};

export default ChatNav;
