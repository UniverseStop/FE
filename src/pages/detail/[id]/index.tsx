import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getBusStopDetail, postChatApplication } from "../../api/post";
import { ChatApprovalType, PostDetailType } from "@/types/postTypes";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css"
import { getCategory } from "@/utils/getCategory";
import DeleteModal from "@/components/detail/DeleteModal";
import KakaoMap from "@/components/detail/KakaoMap";
import UserInfo from "@/components/detail/UserInfo";
import ChatParticipate from "@/components/detail/ChatParticipate";

export default function Detail() {
    const { data: post, isLoading, isError } = useQuery<PostDetailType>(["posts"], () => getBusStopDetail(1));

    // 시간 변경
    const date = post?.endDate.replace("-", "년 ").replace("-", "월 ") + "일";
    const time = post?.endTime; // 형식 변경 필요

    // 이미지 슬라이더
    const [sliderRef] = useKeenSlider({
        loop: true,
    });

    // 삭제 (본인 작성글만 삭제 가능)
    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false); // 삭제 모달

    // 참가 신청 (다른 사용자 글에만 가능)
    const applicationMutation = useMutation(postChatApplication, {});
    const handleClickApplication = () => {
        if (post) applicationMutation.mutate(post.id);
    };

    return (
        <div>
            {post && <div className="bg-postColor h-svh">
                {isDeleteModal ? <DeleteModal postId={post.id} isDeleteModal={isDeleteModal} setIsDeleteModal={setIsDeleteModal}/> : <></>}
                <section className="flex justify-between p-6">
                    <UserInfo nickname={post.nickname} age={Number(post.age)} gender={post.gender} imageUrl={post.profileImageUrl} isDeleteModal={isDeleteModal} setIsDeleteModal={setIsDeleteModal}/>
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
                <section>
                    <span className="pl-2 text-2xl font-bold">📍장소</span>
                    <KakaoMap location={post.location}/>
                </section>
                <section className="p-2 pt-7">
                    <span className="pl-1 pb-4 text-2xl font-bold">👩🏻‍🚀 신청자 정보</span>
                    {post.applicants.map((p: ChatApprovalType) => {
                        return <ChatParticipate key={p.userId} info={p} postId={post.id} userId={post.userId}/>
                    })}
                </section>
                <section className="relative">
                    <button onClick={()=>handleClickApplication()} className="z-50 absolute bottom-5 right-5 w-[100px] h-[100px] flex flex-col justify-center items-center rounded-full bg-white">
                        <img className="w-[70px] h-[70px]" alt="application" src="/images/application.png"/>
                        <span className="font-bold text-xs">참가신청</span>
                    </button>
                </section>
            </div>}
        </div>
    )
}