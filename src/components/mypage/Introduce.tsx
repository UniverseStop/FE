import Link from "next/link";
import React from "react";
import { FaPen } from "react-icons/fa6";

function Introduce() {
	return (
		<div>
			<div className="grid justify-items-center">
				<p className="text-white font-bold text-2xl mt-[220px]">
					나는 <span className="text-mainColor">#만 25세 #여자</span>입니다.<br></br>내 관심사는{" "}
					<span className="text-mainColor">#맛집 #운동</span> 입니다.
				</p>
			</div>
			<div className="flex justify-center mt-12">
				<p className=" text-white font-bold text-3xl mt-2;">야옹야옹</p>
				<button className="cursor=pointer">
					<Link href="/mypage/edit">
					<FaPen color="#6B6C80" className="w-6 h-6 ml-2 mb-1" />
					</Link>
				</button>
			</div>
		</div>
	);
}

export default Introduce;
