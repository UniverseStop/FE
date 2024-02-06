import Category from "@/components/category/Category";
import UserInput from "@/components/user-input/UserInput";
import { GetCurrentUser } from "@/utils/getCurrentUser";
import { removeSession } from "@/utils/removeSession";
import { saveSession } from "@/utils/saveSession";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { putUserInfoSet } from "../api/user";
import { ConfirmPermissions } from "@/utils/confirmPermissions";
import { getEngGender } from "@/utils/getEngGender";

function UserInfoSetting() {
	const [nickname, setNickname] = useState<string>("");
	const [interest, setInterest] = useState<string>("");
	const [age, setAge] = useState<string>("");
	const [koGender, setGender] = useState<string>("남");
	const [isValidatedNickname, setIsValidatedNickname] = useState<boolean>(false); //닉네임 형식에 맞는지 체크
	const [isConfirmNicknameSuccess, setIsConfirmNicknameSuccess] = useState<boolean>(false); //닉네임 중복확인 체크
	const queryClient = useQueryClient();
	const router = useRouter();

	ConfirmPermissions(); // 로그인 후 이용가능한 페이지

	const handleCategoryChange = (category: string) => {
		setInterest(category);
	};

	const gender = getEngGender(koGender)

	const userSettings = {
		nickname,
		interest,
		age,
		gender,
	};


	const userInfo = GetCurrentUser();
	const myPageSetData = {
		userId: userInfo.userId,
		userSettings: userSettings,
	};

	/** 통신로직 */
	const putUserSettingsMutation = useMutation(putUserInfoSet, {
		onSuccess: (response) => {
			const { status } = response;
			if( status === 200) {
			queryClient.invalidateQueries(["mypage", userInfo.userId]);
			//토큰 삭제 후 토큰 갱신
			const { headers } = response;
			const newToken = headers.authorization;
			removeSession("access_Token");
			saveSession("access_Token", newToken);
			console.log('response', response)
			} else {
				alert("에러가 발생하였습니다")
			}
		},
		onError: (err) => {
			console.log("putUserSettingsMutation통신에러", err);
		},
	});

	// 시작하기 버튼 눌렀을때 함수
	const handleSubmitUserInfo = (e: React.FormEvent) => {
		e.preventDefault();
		if (age.trim() == "") {
			alert("나이를 입력해주세요");
			return;
		}
		if (interest.trim() == "") {
			alert("관심사를 선택해주세요")
			return;
		}
		if (nickname.trim() == "") {
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
			putUserSettingsMutation.mutate(myPageSetData);
			router.push("/main");

		} else { alert ("닉네임을 확인해주세요") }
	};

	return (
		<form onSubmit={handleSubmitUserInfo} className="flex flex-col justify-between h-screen">
			<section>
				<Category title="나의 관심사를 선택해주세요" handleCategoryChange={handleCategoryChange} />
				<UserInput title="닉네임" placeholder="닉네임을 입력해주세요" isShowDuplicateCheckBtn={true} nickname={nickname} setNickname={setNickname} isValidatedNickname={isValidatedNickname} setIsValidatedNickname={setIsValidatedNickname} setIsConfirmNicknameSuccess={setIsConfirmNicknameSuccess}/>
				<UserInput title="나이" placeholder="만 나이를 입력해주세요" isShowDuplicateCheckBtn={false} age={age} setAge={setAge}/>
				<UserInput title="성별" placeholder="성별을 입력해주세요" isShowDuplicateCheckBtn={false} gender={koGender} setGender={setGender}/>
			</section>
			<section className="flex justify-center mb-10">
				<button type="submit" className="bg-mainColor text-white h-14 rounded-2xl w-1/4">
					시작하기
				</button>
			</section>
		</form>
	);
}

export default UserInfoSetting;
