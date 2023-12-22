import { useQuery } from "react-query";
import { getPostDetail } from "../../api/post";
import { PostDetailType } from "@/types/postTypes";
import { getCategory } from "@/utils/getCategory";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

export default function Detail() {
    const { data: post, isLoading, isError } = useQuery<PostDetailType>(["posts"], () => getPostDetail(21));

    // 시간 변경
    const date = post?.endDate.replace("-", "년 ").replace("-", "월 ") + "일";
    const time = post?.endTime; // 형식 변경 필요

    // 이미지 슬라이더
    const [sliderRef] = useKeenSlider({
        loop: true,
    });

    return (
        <div>
            {post && <div className="bg-postColor h-svh">
                <section className="flex justify-between p-6">
                    <div className="flex">
                        <img className="w-[80px] h-[80px] rounded-full" alt="profile" src={post.profileImageUrl}/>
                        <div className="flex flex-col pl-5 pt-2">
                            <span className="text-2xl font-bold">{post.nickname}</span>
                            <span className="text-sm">만{post.age}세 • {post.gender === "female" ? "여" : "남"}</span>
                        </div>
                    </div>
                    <span className="text-sm pt-2 pr-4">{post.createdAt.split("T")[0].replaceAll("-", ".")}</span>
                </section>
                <section className="flex flex-col text-2xl pt-5 pl-8 pb-5">
                    <div className="flex flex-col">
                        <span><span className="text-mainColor font-bold">#{post.location}</span>에서</span>
                        <span>{post.title}</span>
                    </div>
                    <div className="flex flex-col text-mainColor font-bold pt-7">
                        <span>#{date} {time}</span>
                        <span>#{getCategory(post.category)}</span>
                    </div>
                </section>
                <section className="relative pb-[180px]">
                    <div ref={sliderRef} className="keen-slider">
                        {post.imageUrlList.map((url)=>{
                            return <img className="keen-slider__slide w-full h-[350px]" key={post.id} alt="image" src={url} />
                        })}
                    </div>
                    <div className="absolute w-[95%] h-[40%] mt-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow offset-x-2 offset-y-2 blur-4bg-gray-800">
                        <div className="flex flex-col p-6">
                            <span className="text-xl">{post.title}</span>
                            <span className="text-sm pt-3">{post.content}</span>
                        </div>
                    </div>
                </section>
                <section className="pl-2">
                    <span className="text-2xl font-bold">📍장소</span>
                </section>
            </div>}
        </div>
    )
}