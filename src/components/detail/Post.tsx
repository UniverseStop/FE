import { useState } from "react";
import { useQuery } from "react-query";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css"
import { useAuth } from "@/context/KakaoContext";
import { getBusStopDetail } from "@/pages/api/post";
import { getCategory } from "@/utils/getCategory";
import KakaoMap from "./KakaoMap";
import ChatParticipate from "./ChatParticipate";
import ChatApplication from "./ChatApplication";
import UserInfo from "./UserInfo";
import DeleteModal from "./DeleteModal";

const Post = ({postId}: {postId: number}) => {
    const { data: post } = useQuery("post", () => getBusStopDetail(postId));

    // 현재 로그인된 사용자 정보
    const { userInfo } = useAuth();
    const isWriter = Number(userInfo?.userId) === post?.userId; // 내가 작성한 글 유무 확인

    // 이미지 슬라이더
    const [sliderRef] = useKeenSlider({
        loop: true,
    });

    // 삭제 (본인 작성글만 삭제 가능)
    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false); // 삭제 모달

    // 관리자에 의해 삭제된 게시물의 경우
    if (typeof post === "string") {
        return (
            <div className=" bg-postColor h-screen flex justify-center items-center">
                <span className="font-bold text-3xl">{post}</span>
            </div> 
        );
    }

    // 날짜 및 시간 정보
    const date = post?.endDate.replace("-", "년 ").replace("-", "월 ") + "일"; // 날짜
    const time = post?.endTime; // 시간: 형식 변경 필요
    
    return (
        <div className="bg-postColor">
            {post &&
            <div className="h-svh">
                {isDeleteModal ? <DeleteModal postId={post.id} isDeleteModal={isDeleteModal} setIsDeleteModal={setIsDeleteModal}/> : <></>}
                <section className="flex justify-between p-6">
                    <UserInfo userId={post.userId} nickname={post.nickname} age={Number(post.age)} gender={post.gender} imageUrl={post.profileImageUrl} isDeleteModal={isDeleteModal} setIsDeleteModal={setIsDeleteModal}/>
                    <span className="text-sm pt-2 pr-4">{post.createdAt.split("T")[0].replaceAll("-", ".")}</span>
                </section>
                <section className="flex flex-col text-2xl pt-5 pl-8 pb-5">
                    <div className="flex flex-col">
                        <span><span className="text-mainColor font-bold">#{post.locationDetail}</span>에서</span>
                        <span>{post.title}</span>
                    </div>
                    <div className="flex flex-col text-mainColor font-bold pt-7">
                        <span>#{date} {time}</span>
                        <span>#{getCategory(post.category)}</span>
                    </div>
                </section>
                <section className="relative pb-[180px]">
                    <div ref={sliderRef} className="keen-slider">
                        {post.imageUrlList.map((url: string, index: number)=>{
                            return <img className="keen-slider__slide w-full h-[350px]" key={index} alt="image" src={url} />
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
                    <KakaoMap location={post.locationDetail}/>
                </section>
                {/* 신청자 정보 */}
                {isWriter ? <ChatParticipate applicants={post.applicants} postId={post.id} userId={post.userId}/> : <></>}
                {/* 참가 신청 버튼 */}
                {userInfo && !isWriter && !post.isAlreadyApplicant ? <ChatApplication postId={post.id}/> : <></>}
            </div>}
        </div>
    )
}

export default Post;