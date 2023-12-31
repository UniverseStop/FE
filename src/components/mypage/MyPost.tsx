import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { PostPreviewType } from "@/types/postTypes";
import PostDetail from "../post/PostDetail";

function MyPost({ userPosts }: { userPosts: PostPreviewType[] }) {
	const [ref] = useKeenSlider<HTMLDivElement>({
		slides: {
			perView: 3,
			spacing: 10,
		},
	});

	console.log("하은님컴포넌트에 들어갈info", userPosts);

	return (
		<div>
			<p className="text-white font-bold text-3xl pt-[70px] pl-6">내가 쓴 글</p>
			<div ref={ref} className="keen-slider p-5">
				{Array.isArray(userPosts) && userPosts.length > 0 ? (
					userPosts.slice(0, 6).map((item: PostPreviewType) => (
						<div key={item.id} className="keen-slider__slide number-slide1">
							<PostDetail info={item} wSize="w-[full]" hSize="h-[150px]" />
						</div>
					))
				) : (
					<div className="text-white font-bold text-2xl ml-2">등록된 게시글이 없습니다.</div>
				)}
			</div>
		</div>
	);
}

export default MyPost;
