import React from "react";

function AddContent({
	postContent,
	setPostContent,
}: {
	postContent: string;
	setPostContent: (postContent: string) => void;
}) {
	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		let newText = e.target.value;
		setPostContent(newText);
	};

	return (
		<div>
			<p className="text-2xl font-bold m-6 0 6 6">내용</p>
			<div className="flex ml-6">
				<textarea
					className="pl-4 pt-4 border resize-none border-mainColor rounded-2xl w-[600px] h-60"
					value={postContent}
					onChange={handleContentChange}
					maxLength={1500}
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
