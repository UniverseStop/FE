// 초기 로그인시 유저정보 설정 타입
export interface FirstSetUserInfoType {
    nickname : string;
    interest : string;
    age : string;
    gender : string;
}

export interface NewSetDataType {
    userId : string;
    userSettings : FirstSetUserInfoType;
}

// 마이페이지 수정시 유저정보 타입
export interface EditUserInfoType {
    nickname: string;
    interest: string;
}

export interface NewEditDataType {
    userId : string;
    userEditSettings : EditUserInfoType;
}