import Category from "@/components/category/Category";
import AddContent from "@/components/create-post/AddContent";
import AddDateTime from "@/components/create-post/AddDateTime";
import AddImage from "@/components/create-post/AddImage";
import AddPlace from "@/components/create-post/AddPlace";
import AddTitle from "@/components/create-post/AddTitle";
import React from "react";

function createPost() {

	const handleCategoryChange = (category: string) => {

	}
3

	return (
		<div>
			<section>
				<Category title="🗂️ 카테고리" handleCategoryChange={handleCategoryChange} />
				<AddImage />
				<AddTitle />
				<AddContent />
				<AddDateTime />
				<AddPlace />
			</section>
			<section className="flex justify-center mb-10 mt-[100px] gap-10">
				<button className="border text-mainColor border-mainColor h-14 rounded-2xl w-1/4">취소</button>
				<button className="bg-mainColor text-white h-14 rounded-2xl w-1/4">등록하기</button>
			</section>
		</div>
	);
}

export default createPost;
