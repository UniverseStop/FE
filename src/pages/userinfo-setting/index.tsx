import Category from "@/components/category/Category";
import UserInput from "@/components/user-input/UserInput";
import { FirstSetUserInfoType } from "@/types/myPageTypes";
import React, { useState } from "react";
import { putUserInfoSet } from "../api/user";

function UserInfoSetting() {
	const handleCategoryChange = (category: string) => {
		setInterest(category);
	};

	const [nickname, setNickname] = useState<string>("");
	const [interest, setInterest] = useState<string>("");
	const [age, setAge] = useState<string>("");
	const [gender, setGender] = useState<string>("");

	const userInfo = {
		nickname,
		interest,
		age,
		gender,
	};

	console.log(userInfo);

	const submitUserInfoHandler = (e: React.FormEvent) => {
		e.preventDefault();
		putUserInfoSet(userInfo);
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
				/>
				<UserInput
					title="나이"
					placeholder="만 나이를 입력해주세요"
					isShowDuplicateCheckBtn={false}
					age={age}
					setAge={setAge}
				/>
				<UserInput title="성별" placeholder="성별을 입력해주세요" isShowDuplicateCheckBtn={false} gender={gender} setGender={setGender} />
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
