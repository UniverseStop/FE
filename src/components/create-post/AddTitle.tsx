import React from "react";

function AddTitle({ postTitle, setPostTitle }: { postTitle: string; setPostTitle: (postTitle: string) => void }) {
	const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		let newText = e.target.value;
		setPostTitle(newText);
	};

	return (
		<div>
			<p className="text-2xl font-bold m-6 0 6 6">제목</p>
			<div className="flex ml-6">
				<input
					maxLength={30}
					value={postTitle}
					onChange={handleTitleChange}
					type="text"
					placeholder="제목을 작성해주세요"
					className="pl-4 border border-mainColor rounded-2xl w-[600px] h-14"
				/>
			</div>
		</div>
	);
}

export default AddTitle;
