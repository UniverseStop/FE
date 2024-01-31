export interface MessageType {
    createdAt: string | null;
    imageUrl: string | null;
    message: string;
    messageId: string | null;
    modifiedAt: string | null;
    profileImageUrl: string | null;
    roomId: string;
    sender: string;
    senderId: string;
    type: string;
    userCount: number | string;
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
