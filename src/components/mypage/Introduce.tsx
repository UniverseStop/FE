import { getCategory } from "@/utils/getCategory";
import { getGender } from "@/utils/getGender";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaPen } from "react-icons/fa6";

function Introduce({
	age,
	gender,
	nickname,
	interest,
	loggedInUserId,
	myPageUserId,
}: {
	age: string | null;
	gender: string | null;
	nickname: string | null;
	interest: string | null;
	loggedInUserId: string | null;
	myPageUserId: number | null;
}) {
	//영어 -> 한국어
	const userInterest = getCategory(interest);
	const userGender = getGender(gender);

	return (
		<div>
			<div className="grid justify-items-center">
				<p className="text-white font-bold text-2xl mt-[220px]">
					나는
					<span className="text-mainColor">
						#만 {age}세 #{userGender}자
					</span>
					입니다.<br></br>내 관심사는 <span className="text-mainColor">#{userInterest}</span> 입니다.
				</p>
			</div>
			<div className="flex justify-center mt-12">
				<p className=" text-white font-bold text-3xl mt-2;">{nickname}</p>
				{Number(loggedInUserId) == myPageUserId ? (
					<button className="cursor=pointer">
						<Link href="/mypage/edit">
							<FaPen color="#6B6C80" className="w-6 h-6 ml-2 mb-1" />
						</Link>
					</button>
				) : (
					<Link href={`/user-report/${myPageUserId}`}>
						<Image
							alt="신고_사이렌아이콘"
							width={200}
							height={200}
							src="/images/siren.png"
							className="w-8 h-8 ml-2"
						/>
					</Link>
				)}
			</div>
		</div>
	);
}

export default Introduce;
