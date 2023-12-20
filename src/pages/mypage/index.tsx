import Introduce from "@/components/mypage/Introduce";
import MyPost from "@/components/mypage/MyPost";
import Profile from "@/components/mypage/Profile";
import Image from "next/image";
import React from "react";

const index = () => {
	return (
		<div className="gradation">
			<div className="bg-mypage bg-cover flex flex-col h-screen">
				<Introduce />
				<Profile />
				<MyPost />
			</div>
		</div>
	);
};

export default index;
