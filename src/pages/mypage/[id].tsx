import Introduce from "@/components/mypage/Introduce";
import MyPost from "@/components/mypage/MyPost";
import Profile from "@/components/mypage/Profile";
import { GetMyPageUserInfo } from "@/types/myPageTypes";
import { GetCurrentUser } from "@/utils/getCurrentUser";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getMyPage } from "../api/user";
import cx from "classnames"
import { useMediaQuery } from "usehooks-ts";

const Mypage = () => {
	const isHeightMax = useMediaQuery("(height:1052px)")
	const userInfo = GetCurrentUser();
	const router = useRouter();

	//로그인한 정보 context api 에서 받아오는 id값 (1번 id / 사용자)
	const loggedInUserId = userInfo.userId;

	//url 에서 가져온 id값 : string type -> num으로 변환해줘야함 (2번 id / 페이지주인)3
	const urlId = router.query.id;
	const myPageUserId = urlId;

	/** 서버에서 받아오는 2번 id 주인의 데이터 */
	const { data: mypage, isLoading, isError } = useQuery(["mypage", myPageUserId], () => getMyPage(Number(myPageUserId)));
	const [myPageInfo, setMyPageInfo] = useState<GetMyPageUserInfo | null>(null)
	useEffect(()=>{
		if (mypage) setMyPageInfo(mypage)
	}, [mypage]);


	const { age, gender, mannerTemplate, nickname, profileImageUrl, userId, interest } = myPageInfo
	? myPageInfo
	: { age : null, gender : null, mannerTemplate : null, nickname : null, profileImageUrl : null, userId : null, interest : null, };


	const UserPosts = myPageInfo
		? myPageInfo.userPosts
		: { age : null, category : null, createdAt: null, endDate: null, gender: null, id: null, imageUrlList: null, thumbnailImageUrl: null,
			location: null, nickname: null, profileImageUrl: null, title: null, userId: null, views: null };

	return (
		<div className="gradation">
			<div className={cx("sm:bg-mypageDesktop bg-mypageMobile bg-cover bg-no-repeat flex flex-col h-full", isHeightMax && "h-screen")}>
				<Introduce age={age} gender={gender} nickname={nickname} interest={interest} loggedInUserId={loggedInUserId} myPageUserId={Number(myPageUserId)}/>
				<Profile profileImageUrl={profileImageUrl} />
				<MyPost userPosts={UserPosts} />
				<div className="h-[65px]"></div>
			</div>
		</div>
	);
};

export default Mypage;
