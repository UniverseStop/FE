export interface UserType {
    age: string; // 나이
    createdAt: string; // 회원가입 일시
    lastAccessed: string; // 최근 접속 일시
    gender: string; // 성별
    id: number; // 사용자 ID
    nickname: string; // 닉네임
    profileImageUrl: string; // 프로필 이미지 URL
    role: string; // 사용자 종류 (SUPER: 최고 관리자, ADMIN: 일반 관리자)
    reportCount: number; // 신고 횟수
    mannerTemplate: number; // 온도
}

export interface UserReportType {
    createdAt: string; // 신고 일시
    report: string; // 신고 종류
    reportDetail: string; // 신고 내용
    reportImages: string[]; // 신고 이미지
    reportedUserId: number; // 신고한 유저 ID
    reporter: string; // 신고자 닉네임
}

export type ReportType = {
    [key: string]: string;
};

export interface SalvationReasonType {
    content: string, // 구제 내용
    createdAt: string, // 구제 신청 일시
    isView: boolean, // 서버 DTO 분리용
}

export interface AdminListType {
    age: string;
    gender : string;
    nickname : string;
    profileImg : string;
    super : boolean;
}

export interface UserSearchListType {
    age: string;
    gender : string;
    nickname : string;
    profileImg : string;
    role : string;
}

export interface BlockPostListType {
    authorAge: string;
    authorGender : string;
    authorImg : string;
    authorNickname : string;
    blockedDate : string;
    postTitle : string;
}

export interface StatisticsType {
    tenCnt: number;
    twentyCnt: number;
    thirtyCnt: number;
    fortyCnt: number;
    fiftyCnt: number;
    sixtyCnt: number;
    ageEtcCnt: number;
    eatsCnt: number;
    cultureCnt: number;
    exerciseCnt: number;
    studyCnt: number;
    categoryEtcCnt: number;
    maleCnt: number;
    femaleCnt: number;
    genderEtcCnt: null;
    monthCnt: number[];
    weekCnt: number;
    allDayCnt: number;
}
