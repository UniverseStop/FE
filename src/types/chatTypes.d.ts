export interface MessageType {
    createdAt?: string;
    imageUrl?: string;
    message?: string;
    messageId?: string;
    modifiedAt?: string;
    profileImageUrl?: string;
    roomId?: string;
    sender?: string;
    senderId?: string;
    type?: string;
    userCount?: number | string;
}

// 페이지 내용 타입 정의
export interface PageContent {
    content: MessageType[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: any;
    size: number;
    sort: any;
}

// 네트워크 응답 타입 정의
export interface ResponseData {
    content: MessageType[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: any;
    size: number;
    sort: any;
    status: number;
    statusText: string;
    content: any;
}

//구독한 채팅방 전체 리스트
export interface ChatType {
    roomId: string,
    name: string,
    userCount: number,
    titleImageUrl: string,
    participants: string[],
    lastMessage: string | null,
    lastMessageSender: string | null,
    lastMessageSenderProfileImageUrl: string | null,
    lastMessageTime: string | null
}
