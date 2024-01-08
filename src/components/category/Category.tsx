import React, { useState } from "react";
import CategoryBtn from "./CategoryBtn";

function Category({
	title,
	handleCategoryChange,
}: {
	title: string;
	handleCategoryChange: (categoryTag: string) => void;
}) {
	const [activeCategory, setActiveCategory] = useState("");

	const handleCategoryBtnClick = (categoryTag: string) => {
		handleCategoryChange(categoryTag);
		setActiveCategory(categoryTag);
	};

	return (
		<div>
			<p className="text-2xl font-bold m-6 0 6 6">{title}</p>
			<div className="flex justify-around">
				<CategoryBtn
					emoticon="🍰"
					categoryTag="맛집"
					handleCategoryChange={handleCategoryBtnClick}
					isClicked={activeCategory === "맛집"}
				/>
				<CategoryBtn
					emoticon="🎬"
					categoryTag="문화"
					handleCategoryChange={handleCategoryBtnClick}
					isClicked={activeCategory === "문화"}
				/>
				<CategoryBtn
					emoticon="🏀"
					categoryTag="운동"
					handleCategoryChange={handleCategoryBtnClick}
					isClicked={activeCategory === "운동"}
				/>
				<CategoryBtn
					emoticon="📖"
					categoryTag="스터디"
					handleCategoryChange={handleCategoryBtnClick}
					isClicked={activeCategory === "스터디"}
				/>
				<CategoryBtn
					emoticon="🎸"
					categoryTag="기타"
					handleCategoryChange={handleCategoryBtnClick}
					isClicked={activeCategory === "기타"}
				/>
			</div>
		</div>
	);
}

export default Category;
