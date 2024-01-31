import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { Stomp } from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import {useAuth} from "@/context/KakaoContext";

const Socket = () => {
    const auth = useAuth();
    const stompClient = useRef();
    const [IsConnected, setIsConnected] = useState(false);
    const [chatId, setChatId] = useState("");
    const [chat, setChat] = useState([]);


    return (
        <div>

         </div>
    );
};

export default Socket;
