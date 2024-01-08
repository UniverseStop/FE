import Introduce from "@/components/mypage/Introduce";
import MyPost from "@/components/mypage/MyPost";
import Profile from "@/components/mypage/Profile";
import { useAuth } from "@/context/KakaoContext";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { getMyPage } from "../api/user";

const Mypage = () => {
	//로그인한 정보 context api 에서 받아오는 id값 (1번 id / 사용자)
	const auth = useAuth();
	const {userInfo} = auth;
	// console.log("userInfo", userInfo)

	//url 에서 가져온 id값 : string type -> num으로 변환해줘야함 (2번 id / 페이지주인)
	const router = useRouter();
	const urlId = router.query.id
	const NumUrlId = Number(urlId)
	// console.log("router", urlId)

	const { data: mypage, isLoading, isError } = useQuery(["mypage", NumUrlId], () => getMyPage(NumUrlId));

	// console.log("data 호", mypage)


	//1번과 2번이 같으면 수정표시 있게, 다르다면 신고표시뜨게

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
