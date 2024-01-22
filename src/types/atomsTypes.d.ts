export interface CurrentUserType {
    isLoggedIn: boolean, // 로그인 유무
    userId: string, // 사용자 ID
    nickname: string, // 닉네임
    age: string, // 나이
    auth: string, // 사용자 종류 (일반 사용자, 관리자)
    interest: string, // 관심사
    profileImageUrl: string, // 프로필 이미지
}

export interface filterType {
    titleOrContent:string,
    endDate :string,
    location: string,
    interest:string,
}