import Category from "@/components/category/Category";
import UserInput from "@/components/user-input/UserInput";
import { useAuth } from "@/context/KakaoContext";
import { FirstSetUserInfoType } from "@/types/myPageTypes";
import { removeSession } from "@/utils/removeSession";
import { saveSession } from "@/utils/saveSession";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { putUserInfoSet } from "../api/user";

function UserInfoSetting() {
	const [nickname, setNickname] = useState<string>("");
	const [interest, setInterest] = useState<string>("");
	const [age, setAge] = useState<string>("");
	const [gender, setGender] = useState<string>("");
	const [isValidatedNickname, setIsValidatedNickname] = useState<boolean>(false);
	const [isConfirmNicknameSuccess, setIsConfirmNicknameSuccess] = useState<boolean>(false);
	const { userInfo } = useAuth();
	const queryClient = useQueryClient();

	const handleCategoryChange = (category: string) => {
		setInterest(category);
	};

	const userSettings = {
		nickname,
		interest,
		age,
		gender,
	};

	const myPageSetData = {
		userId: userInfo ? userInfo.userId : null,
		userSettings: userSettings,
	};

	/** 통신로직 */
	const putUserSettingsMutation = useMutation(putUserInfoSet, {
		onSuccess: (data) => {
			//마이페이지 쿼리키 갱신
			queryClient.invalidateQueries(["mypage", userInfo.userId]);
			//토큰 삭제 후 토큰 갱신
			const { headers } = data;
			const newToken = headers.authorization;
			removeSession("access_Token");
			saveSession("access_Token", newToken);
		},
		onError: (err) => {
			console.log("putUserSettingsMutation통신에러", err);
		},
	});

	const submitUserInfoHandler = (e: React.FormEvent) => {
		e.preventDefault();
		if (age.trim() == "") {
			alert("나이를 입력해주세요");
			return;
		}
		if (isValidatedNickname && isConfirmNicknameSuccess) {
			putUserSettingsMutation.mutate(myPageSetData);
		} else alert("닉네임을 다시한번 확인해주세요.");
	};

	return (
		<form onSubmit={submitUserInfoHandler} className="flex flex-col justify-between h-screen">
			<section>
				<Category title="나의 관심사를 선택해주세요" handleCategoryChange={handleCategoryChange} />
				<UserInput
					title="닉네임"
					placeholder="닉네임을 입력해주세요"
					isShowDuplicateCheckBtn={true}
					nickname={nickname}
					setNickname={setNickname}
					isValidatedNickname={isValidatedNickname}
					setIsValidatedNickname={setIsValidatedNickname}
					setIsConfirmNicknameSuccess={setIsConfirmNicknameSuccess}
				/>
				<UserInput
					title="나이"
					placeholder="만 나이를 입력해주세요"
					isShowDuplicateCheckBtn={false}
					age={age}
					setAge={setAge}
				/>
				<UserInput
					title="성별"
					placeholder="성별을 입력해주세요"
					isShowDuplicateCheckBtn={false}
					gender={gender}
					setGender={setGender}
				/>
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
