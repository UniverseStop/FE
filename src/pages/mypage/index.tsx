import Introduce from "@/components/mypage/Introduce";
import MyPost from "@/components/mypage/MyPost";
import Profile from "@/components/mypage/Profile";
import React from "react";

const mypage = () => {
	return (
		<div className="gradation">
			<div className="bg-mypage bg-cover bg-no-repeat flex flex-col h-full">
				<Introduce />
				<Profile />
				<MyPost />
			</div>
		</div>
	);
};

export default mypage;