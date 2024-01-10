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
	const { userInfo } = auth;
	const loggedInUserId = userInfo ? userInfo.userId : null;

	//url 에서 가져온 id값 : string type -> num으로 변환해줘야함 (2번 id / 페이지주인)
	const router = useRouter();
	const urlId = router.query.id;
	const myPageUserId = Number(urlId);

	/** 서버에서 받아오는 2번 id 주인의 데이터 */
	const { data: mypage, isLoading, isError } = useQuery(["mypage", myPageUserId], () => getMyPage(myPageUserId));

	const { age, gender, mannerTemplate, nickname, profileImageUrl, userId, interest } = mypage
		? mypage.data
		: { age : null, gender : null, mannerTemplate : null, nickname : null, profileImageUrl : null, userId : null, interest : null, };

	const UserPosts = mypage
		? mypage.data.userPosts
		: { age : null, category : null, createdAt: null, endDate: null, gender: null, id: null, imageUrlList: null, thumbnailImageUrl: null,
			location: null, nickname: null, profileImageUrl: null, title: null, userId: null, views: null };

	return (
		<div className="gradation">
			<div className="bg-mypage bg-cover bg-no-repeat flex flex-col h-full">
				<Introduce
					age={age}
					gender={gender}
					nickname={nickname}
					interest={interest}
					loggedInUserId={loggedInUserId}
					myPageUserId={myPageUserId}
				/>
				<Profile profileImageUrl={profileImageUrl} />
				<MyPost userPosts={UserPosts} />
			</div>
		</div>
	);
};

export default Mypage;
