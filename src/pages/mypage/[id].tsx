import Introduce from "@/components/mypage/Introduce";
import MyPost from "@/components/mypage/MyPost";
import Profile from "@/components/mypage/Profile";
import { useAuth } from "@/context/KakaoContext";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { getMyPage } from "../api/user";

const Mypage = () => {
	//로그인한 정보 context api 에서 받아오는 id값
	const auth = useAuth();
	const {userInfo} = auth;
	console.log("userInfo", userInfo)

	//url 에서 가져온 id값 : string type
	const router = useRouter();
	const urlId = router.query.id
	console.log("router", urlId)

	const { data: mypage, isLoading, isError } = useQuery(["mypage"], () => getMyPage(Number(urlId)));

	console.log("data 호", mypage)


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

export default Mypage;
