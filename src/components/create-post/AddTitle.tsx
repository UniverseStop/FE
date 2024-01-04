import React from "react";

function AddTitle() {
	return (
		<div>
			<p className="text-2xl font-bold m-6 0 6 6">제목</p>
			<div className="flex ml-6">
				<input
					type="text"
					placeholder="제목을 작성해주세요"
					className="pl-4 border border-mainColor rounded-2xl w-full h-14"
				/>
			</div>
		</div>
	);
}

export default AddTitle;
