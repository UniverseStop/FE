export interface LayoutProps {
    children: ReactNode;
}

// 정류장 미리보기 타입
interface PostPreviewType {
    age: string;
    category: string;
    createdAt: string;
    endDate: string;
    gender: string;
    id: number;
    imageUrlList: string[],
    thumbnailImageUrl: string[];
    locationDetail: string;
    nickname: string;
    profileImageUrl: string;
    title: string;
    userId: number;
    views: number;
}

interface ChatApprovalType {
    age: number;
    gender: string;
    nickname: string;
    profileImageUrl: string;
    turn: number;
    userId: number;
}

// 게시물 상세 타입
interface PostDetailType extends PostPreviewType {
    chatParticipants: string[], // 채탕방 참여자들 정보
    chatroomId: string, // 채팅방 ID
    content: string, // 게시물 내용
    isComplete: boolean,
    status: string,
    endTime: string,
    applicants: ChatApprovalType[], // 참여 신청한 유저들 정보
    isAlreadyApplicant: boolean, // 참여 신청한 게시물인지 여부
    isParticipants: boolean, // 이미 참여한 게시물인지 여부
    status: string, // 게시물 종류
};

// 게시물 카테고리 타입
type CategoryType = {
    [key: string]: string;
};
