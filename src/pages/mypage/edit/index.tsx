import Category from "@/components/category/Category";
import UserInput from "@/components/user-input/UserInput";
import { putUserInfoEdit } from "@/pages/api/user";
import { ConfirmPermissions } from "@/utils/confirmPermissions";
import { GetCurrentUser } from "@/utils/getCurrentUser";
import { removeSession } from "@/utils/removeSession";
import { saveSession } from "@/utils/saveSession";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

function MypageEdit() {
	const [changedCategory, setChangedCategory] = useState<string>("")
	const [changedNickname, setChangedNickname] = useState<string>("")
	const [isValidatedNickname, setIsValidatedNickname] = useState<boolean>(false); //닉네임 형식에 맞는지 체크
	const [isConfirmNicknameSuccess, setIsConfirmNicknameSuccess] = useState<boolean>(false); //닉네임 중복확인 체크
	const queryClient = useQueryClient();
	const router = useRouter();

	ConfirmPermissions(); // 로그인 후 이용가능한 페이지

	const userEditSettings = {
		nickname: changedNickname,
		interest: changedCategory
	}

	const userInfo = GetCurrentUser();
	const myPageEditData = {
		userId : userInfo.userId,
		userEditSettings :  userEditSettings
	}

	//취소 버튼 눌렀을때 함수
	const handleCancel = () => {
		router.back();
	}

	/** 통신로직 */
	const putEditUserMutation = useMutation(putUserInfoEdit, {
		onSuccess: (data) => {
			queryClient.invalidateQueries(["mypage", userInfo.userId]);
			//토큰 삭제 후 토큰 갱신
			const { headers } = data;
			const newToken = headers.authorization;
			removeSession("access_Token");
			saveSession("access_Token", newToken);
			router.push(`/mypage/${userInfo.userId}`);
		},
		onError: (err) => {
			console.log("putEditUserMutation통신에러", err);
		},
	})

	//수정하기 버튼 눌렀을때 함수
	const handleSubmitUserInfo = (e: React.FormEvent) => {
		e.preventDefault();
		if (changedCategory.trim() == "") {
			alert("관심사를 선택해주세요");
			return;
		}
		if (changedNickname.trim() == "") {
			alert("닉네임을 입력해주세요")
			return;
		}
		if (isConfirmNicknameSuccess && !isValidatedNickname) {
			alert("올바르지 않은 닉네임입니다")
			return;
		}
		if (isValidatedNickname && !isConfirmNicknameSuccess) {
			alert("중복 확인이 필요합니다")
			return;
		}
		if (isValidatedNickname && isConfirmNicknameSuccess) {
			putEditUserMutation.mutate(myPageEditData);
		} else { alert ("닉네임을 확인해주세요") }
	};

	return (
		<div className="flex flex-col justify-between h-screen">
			<div>
				<Category title="나의 관심사를 선택해주세요" setChangedCategory={setChangedCategory}/>
				<UserInput title="닉네임" placeholder="닉네임을 입력해주세요" isShowDuplicateCheckBtn={true} setChangeNickname={setChangedNickname}
			 setIsValidatedNickname={setIsValidatedNickname} setIsConfirmNicknameSuccess={setIsConfirmNicknameSuccess}/>
			</div>
			<div className="flex justify-center mb-20 gap-5">
				<button onClick={handleCancel} className="border text-mainColor border-mainColor h-14 rounded-2xl w-1/4">취소</button>
				<button onClick={handleSubmitUserInfo} className="bg-mainColor text-white h-14 rounded-2xl w-1/4">수정하기</button>
			</div>
		</div>
	);
}

export default MypageEdit;
