import Category from "@/components/category/Category";
import UserInput from "@/components/user-input/UserInput";
import React from "react";

function UserInfoSetting() {
	return (
		<div className="flex flex-col justify-between h-screen">
			<section>
				<Category title="나의 관심사를 선택해주세요" />
				<UserInput title="닉네임" placeholder="닉네임을 입력해주세요" isShowDuplicateCheckBtn={true} />
				<UserInput title="나이" placeholder="만 나이를 입력해주세요" isShowDuplicateCheckBtn={false} />
				<UserInput title="성별" placeholder="성별을 입력해주세요" isShowDuplicateCheckBtn={false} />
			</section>
			<section className="flex justify-center mb-10">
				<button className="bg-mainColor text-white h-14 rounded-2xl w-1/4">시작하기</button>
			</section>
		</div>
	);
}

export default UserInfoSetting;
