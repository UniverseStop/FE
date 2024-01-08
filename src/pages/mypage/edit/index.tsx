import Category from "@/components/category/Category";
import UserInput from "@/components/user-input/UserInput";
import React from "react";

function MypageEdit() {

	const handleCategoryChange = (category: string) => {
		console.log("과연", category)
	}

	return (
		<div className="flex flex-col justify-between h-screen ">
			<section>
				<Category title="나의 관심사를 선택해주세요" handleCategoryChange={handleCategoryChange}/>
				<UserInput title="닉네임" placeholder="닉네임을 입력해주세요" isShowDuplicateCheckBtn={true} />
			</section>
			<section className="flex justify-center mb-10 gap-5">
				<button className="border text-mainColor border-mainColor h-14 rounded-2xl w-1/4">취소</button>
				<button className="bg-mainColor text-white h-14 rounded-2xl w-1/4">수정하기</button>
			</section>
		</div>
	);
}

export default MypageEdit;
