import React, { useState } from "react";
import CategoryBtn from "./CategoryBtn";

function Category({
	title,
	handleCategoryChange,
}: {
	title: string;
	handleCategoryChange: (categoryTagKey: string) => void;
}) {
	const [activeCategory, setActiveCategory] = useState("");

	const handleCategoryBtnClick = (categoryTagKey: string) => {
		handleCategoryChange(categoryTagKey);
		setActiveCategory(categoryTagKey);
	};

	return (
		<div>
			<p className="text-2xl font-bold m-6 0 6 6">{title}</p>
			<div className="flex justify-around">
				<CategoryBtn
					emoticon="🍰"
					categoryTag="음식"
					handleCategoryChange={handleCategoryBtnClick}
					isClicked={activeCategory === "음식"}
					categoryTagKey="Eats"
				/>
				<CategoryBtn
					emoticon="🎬"
					categoryTag="문화"
					handleCategoryChange={handleCategoryBtnClick}
					isClicked={activeCategory === "문화"}
					categoryTagKey="Culture"
				/>
				<CategoryBtn
					emoticon="🏀"
					categoryTag="운동"
					handleCategoryChange={handleCategoryBtnClick}
					isClicked={activeCategory === "운동"}
					categoryTagKey="Exercise"
				/>
				<CategoryBtn
					emoticon="📖"
					categoryTag="스터디"
					handleCategoryChange={handleCategoryBtnClick}
					isClicked={activeCategory === "스터디"}
					categoryTagKey="Study"
				/>
				<CategoryBtn
					emoticon="🎸"
					categoryTag="기타"
					handleCategoryChange={handleCategoryBtnClick}
					isClicked={activeCategory === "기타"}
					categoryTagKey="Etc"
				/>
			</div>
		</div>
	);
}

export default Category;
