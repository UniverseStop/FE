import React from "react";
import { FaPen } from "react-icons/fa6";

function Introduce() {
	return (
		<div className="bg-cover bg-[url('https://github.com/UniverseStop/FE/assets/130561236/ccff33d7-545c-406d-98d2-ddb5627d4364')] flex flex-col items-center">
			<p className="text-white font-bold text-2xl mt-[250px]">
				나는 #만 25세 #여자입니다.<br></br>내 관심사는 #맛집 #운동 입니다.
			</p>
			<div className="flex justify-center mt-12">
				<p className=" text-white font-bold text-2xl mt-2;">야옹야옹</p>
				<button className="cursor=pointer">
					<FaPen className="w-6 h-6 ml-2 mb-1" />
				</button>
			</div>
		</div>
	);
}

export default Introduce;
