import React from "react";

function AddContent() {
	return (
		<div>
			<p className="text-2xl font-bold m-6 0 6 6">내용</p>
			<div className="flex ml-6">
				<textarea
					className="pl-4 pt-4 border resize-none border-mainColor rounded-2xl w-full h-60"
					id="content"
					name="content"
					placeholder="내용을 입력해주세요"
					rows={1}
					cols={33}
				/>
			</div>
		</div>
	);
}

export default AddContent;
