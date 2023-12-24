import React from "react";

function UserInput({
	title,
	placeholder,
	isShowDuplicateCheckBtn,
}: {
	title: string;
	placeholder: string;
	isShowDuplicateCheckBtn: boolean;
}) {
	return (
		<div>
			<p className="text-2xl font-bold m-6 0 6 6">{title}</p>
			<div className="flex gap-5 ml-6">
				<input
					type="text"
					placeholder={placeholder}
					className="pl-4 border border-mainColor rounded-2xl w-1/2 h-14"
				/>
				{isShowDuplicateCheckBtn ? (
					<button className="cursor w-1/5 h-14 rounded-2xl bg-mainColor text-white">중복 확인</button>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}

export default UserInput;
