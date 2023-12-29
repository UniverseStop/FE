// Layout
export interface LayoutProps {
    children: ReactNode;
}

// AuthContext
export interface AuthContextType {
    token: string | null;
    updateToken: (newToken: string) => void;
    isLoggedIn: boolean;
    userInfo: any;
    logout: () => void;
}

// ChatList
export interface ChatListType {
    chats: ChatType[];
}

// Chat
export interface ChatType {
    "roomId": string,
    "name": string,
    "userCount": number,
    "titleImageUrl": string,
    "participants": string[],
    "lastMessage": string | null,
    "lastMessageSender": string | null,
    "lastMessageSenderProfileImageUrl": string | null,
    "lastMessageTime": string | null
}
