import React, { useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { PostPreviewType } from "@/types/postTypes";
import PostPreview from "../common/PostPreview";
import { useMediaQuery } from "usehooks-ts";

function MyPost({ userPosts }: { userPosts: PostPreviewType[] }) {
	const isMobile = useMediaQuery("(max-width:430px)")
	const [ref, internalSlider] = useKeenSlider<HTMLDivElement>({
		slides: {
			perView: isMobile ? 2 : 3,
			spacing: 10,
		},
	});

	useEffect(()=>{
		internalSlider?.current?.update()
	},[userPosts])

	return (
		<div>
			<p className="text-white font-bold text-3xl pt-[70px] pl-6">내가 쓴 글</p>
			<div ref={ref} className="keen-slider p-4 w-full mt-3 mb-11">
				{Array.isArray(userPosts) && userPosts.length > 0 ? (
					userPosts.slice(0, 6).map((item: PostPreviewType) => (
						<div key={item.id} className="keen-slider__slide pl-[20px]">
							<PostPreview info={item} type={""}/>
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
