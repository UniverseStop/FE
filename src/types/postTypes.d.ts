export interface LayoutProps {
    children: ReactNode;
}

// 정류장 미리보기 타입
interface PostPreviewType {
    age: string,
    category: string,
    createdAt: string,
    endDate: string,
    gender: string,
    id: number,
    imageUrlList: string[],
    location: string,
    nickname: string,
    profileImageUrl: string,
    title: string,
    userId: number,
    views: number,
};

interface ChatApprovalType {
    age: number,
    gender: string,
    nickname: string,
    profileImageUrl: string,
    turn: number,
    userId: number,
};

// 게시물 상세 타입
interface PostDetailType extends PostPreviewType {
    chatParticipants: string[],
    chatroomId: string,
    content: string,
    isComplete: boolean,
    status: string,
    endTime: string,
    applicants: ChatApprovalType[],
};

// 게시물 카테고리 타입
type CategoryType = {
    [key: string]: string;
};
