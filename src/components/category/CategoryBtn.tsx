import React, { useState } from "react";

function CategoryBtn({
	emoticon,
	categoryTag,
	handleCategoryChange,
	isClicked,
	categoryTagKey
}: {
	emoticon: string;
	categoryTag: string;
	handleCategoryChange: (categoryTagKey: string) => void;
	isClicked: boolean;
	categoryTagKey: string;
}) {
	const categoryBtnClick = () => {
		handleCategoryChange(categoryTagKey);
	};

	return (
		<div className="flex flex-col items-center">
			<button type="button" className="hover" onClick={categoryBtnClick} id={categoryTagKey}>
				<div
					className={`w-20 h-20 rounded-full border border-mainColor border-2 flex items-center justify-center ${
						isClicked ? "bg-mainColor" : ""
					}`}>
					<p className="text-5xl">{emoticon}</p>
				</div>
			</button>
			<p className="mt-2 text-mainColor">{categoryTag}</p>
		</div>
	);
}

export default CategoryBtn;
