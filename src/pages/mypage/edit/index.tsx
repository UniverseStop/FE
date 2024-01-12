import Category from "@/components/category/Category";
import UserInput from "@/components/user-input/UserInput";
import { useAuth } from "@/context/KakaoContext";
import { putUserInfoEdit } from "@/pages/api/user";
import { removeSession } from "@/utils/removeSession";
import { saveSession } from "@/utils/saveSession";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

function MypageEdit() {
	const [changedCategory, setChangedCategory] = useState<string>("")
	const [changedNickname, setChangedNickname] = useState<string>("")
	const [isValidatedNickname, setIsValidatedNickname] = useState<boolean>(false); //닉네임 형식에 맞는지 체크
	const [isConfirmNicknameSuccess, setIsConfirmNicknameSuccess] = useState<boolean>(false); //닉네임 중복확인 체크
	const queryClient = useQueryClient();
	const router = useRouter();

	/** 로그인 후 이용가능한 페이지 */
	const { userInfo, isLoggedIn} = useAuth();
	// useEffect(()=>{
	// 	if(isLoggedIn) {
	// 		router.push("/users/login");
	// 		alert("로그인이 필요한 페이지입니다.")
	// 		return;
	// 	}
	// },[isLoggedIn])


	const handleCategoryChange = (category: string) => {
		setChangedCategory(category)
	}

	const userEditSettings = {
		nickname: changedNickname,
		interest: changedCategory
	}

	const myPageEditData = {
		userId :userInfo ? userInfo.userId : null,
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
			console.log("data", data)
			console.log("헤더", headers)
			removeSession("access_Token");
			saveSession("access_Token", newToken);
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
		if (isValidatedNickname && isConfirmNicknameSuccess) {
			putEditUserMutation.mutate(myPageEditData);
			router.push(`/mypage/${userInfo.userId}`);

		} else alert("닉네임을 다시한번 확인해주세요.");
	};

	return (
		<div className="flex flex-col justify-between h-screen ">
			<section>
				<Category title="나의 관심사를 선택해주세요" handleCategoryChange={handleCategoryChange}/>
				<UserInput title="닉네임" placeholder="닉네임을 입력해주세요" isShowDuplicateCheckBtn={true} nickname={changedNickname} setNickname={setChangedNickname}
				isValidatedNickname={isValidatedNickname} setIsValidatedNickname={setIsValidatedNickname} setIsConfirmNicknameSuccess={setIsConfirmNicknameSuccess}/>
			</section>
			<section className="flex justify-center mb-10 gap-5">
				<button onClick={handleCancel} className="border text-mainColor border-mainColor h-14 rounded-2xl w-1/4">취소</button>
				<button onClick={handleSubmitUserInfo} className="bg-mainColor text-white h-14 rounded-2xl w-1/4">수정하기</button>
			</section>
		</div>
	);
}

export default MypageEdit;
