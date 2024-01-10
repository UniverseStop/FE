import React from "react";

function AddMeetingLimit({
	postSubLimit,
	setpostSubLimit,
}: {
	postSubLimit: number;
	setpostSubLimit: (postSubLimit: number) => void;
}) {
	const numberOptions = Array.from({ length: 20 }, (_, index) => index + 1);

	return (
		<div>
			<p className="text-2xl font-bold m-6 0 6 6">🪧 모임 제한인원</p>
			<section className="flex flex-col items-center gap-4">
				<div className="flex border border-mainColor rounded-2xl w-[580px] h-14 ml-5">
					<select
						className="rounded-2xl p-4 w-[97%] focus:outline-none"
						value={postSubLimit}
						onChange={(e) => setpostSubLimit(Number(e.target.value))}>
						{numberOptions.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
				</div>
			</section>
		</div>
	);
}

export default AddMeetingLimit;
