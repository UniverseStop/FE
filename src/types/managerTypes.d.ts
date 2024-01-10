export interface UserType {
    age: string, // 나이
    createdAt: string, // 회원가입 일시
    lastAccessed: string, // 최근 접속 일시
    gender: string, // 성별
    id: number, // 사용자 ID
    nickname: string, // 닉네임
    profileImageUrl: string, // 프로필 이미지 URL
    role: string, // 사용자 종류 (SUPER: 최고 관리자, ADMIN: 일반 관리자)
    reportCount: number, // 신고 횟수
    mannerTemplate: number, // 온도
}
