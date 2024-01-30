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
    imageUrlList: string[];
    thumbnailImageUrl: string;
    location: string;
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
    chatParticipants: string[]; // 채탕방 참여자들 정보
    chatroomId: string; // 채팅방 ID
    content: string; // 게시물 내용
    isComplete: boolean;
    status: string;
    endTime: string;
    applicants: ChatApprovalType[]; // 참여 신청한 유저들 정보
    isAlreadyApplicant: boolean; // 참여 신청한 게시물인지 여부
    isParticipants: boolean; // 이미 참여한 게시물인지 여부
    status: string; // 게시물 종류
}

// 게시물 카테고리 타입
type CategoryType = {
    [key: string]: string;
};

// react-daum-post 라이브러리 -> 반환되는 주소 데이터 타입
interface LocationDataType {
    postcode: string;
    postcode1: string;
    postcode2: string;
    postcodeSeq: string;
    zonecode: string;
    address: string;
    addressEnglish: string;
    addressType: string;
    bcode: string;
    bname: string;
    bnameEnglish: string;
    bname1: string;
    bname1English: string;
    bname2: string;
    bname2English: string;
    sido: string;
    sidoEnglish: string;
    sigungu: string;
    sigunguEnglish: string;
    sigunguCode: string;
    userLanguageType: string;
    query: string;
    buildingName: string;
    buildingCode: string;
    apartment: string;
    jibunAddress: string;
    jibunAddressEnglish: string;
    roadAddress: string;
    roadAddressEnglish: string;
    autoRoadAddress: string;
    autoRoadAddressEnglish: string;
    autoJibunAddress: string;
    autoJibunAddressEnglish: string;
    userSelectedType: string;
    noSelected: string;
    hname: string;
    roadnameCode: string;
    roadname: string;
    roadnameEnglish: string;
}

interface placeType {
    position: { lat: number; lng: number }; // 위도 경도
    content: string; // 장소 설명
    address: string; // 장소 주소
}

interface myPlaceType {
    lat: number;
    lng: number; // 위도 경도
    placeName: string; // 장소 설명
    address: string; // 장소 주소
}
