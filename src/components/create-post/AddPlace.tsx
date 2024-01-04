import React from "react";

function AddPlace() {
	return (
		<div>
			<p className="text-2xl font-bold m-6 0 6 6">📍장소</p>
			<div className="flex ml-6">
				<button className="flex justify-start border border-mainColor rounded-2xl w-full h-14">
					<p className="text-gray p-4 0 0 6">장소를 선택해주세요.</p>
				</button>
			</div>
		</div>
	);
}

export default AddPlace;
