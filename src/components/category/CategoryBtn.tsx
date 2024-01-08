import React, { useState } from "react";

function CategoryBtn({
	emoticon,
	categoryTag,
	handleCategoryChange,
  isClicked
}: {
	emoticon: string;
	categoryTag: string;
	handleCategoryChange: (categoryTag: string) => void;
  isClicked: boolean;
}) {


const categoryBtnClick = () => {
  handleCategoryChange(categoryTag)
}


	return (
		<div className="flex flex-col items-center">
			<button type="button" className="hover" onClick={categoryBtnClick}>
				<div className={`w-20 h-20 rounded-full border border-mainColor border-2 flex items-center justify-center ${isClicked ? 'bg-mainColor' : ''}`}>
					<p className="text-5xl">{emoticon}</p>
				</div>
			</button>
			<p className="mt-2 text-mainColor">{categoryTag}</p>
		</div>
	);
}

export default CategoryBtn;
