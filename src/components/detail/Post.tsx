import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getBusStopDetail } from "@/pages/api/post";
import { PostDetailType } from "@/types/postTypes";
import UserInfo from "./UserInfo";
import DeleteModal from "./DeleteModal";
import KakaoMap from "./KakaoMap";
import ChatParticipate from "./ChatParticipate";
import ChatApplication from "./ChatApplication";
import PostImageSlider from "./PostImageSlider";
import { GetCurrentUser } from "@/utils/getCurrentUser";
import { getCategory } from "@/utils/getCategory";
import Image from "next/image";
import { postBlockDetailPost } from "@/pages/api/manager";

const Post = ({postId}: {postId: number}) => {
    const queryClient = useQueryClient();
    const { data: post } = useQuery<PostDetailType>("post", () => getBusStopDetail(postId));

    // 현재 로그인된 사용자 정보
    const userInfo = GetCurrentUser();
    const isWriter = Number(userInfo.userId) === post?.userId; // 내가 작성한 글 유무 확인
    const isAdmin = userInfo.auth == "ADMIN" || userInfo.auth === "SUPER";

    // 이미지 슬라이더 크게 보기
    const [selectImg, setSelectImg] = useState(false);

    // 삭제 (본인 작성글만 삭제 가능)
    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false); // 삭제 모달

    // 차단 (관리자만 차단 가능)
    const postBlockMutation = useMutation(postBlockDetailPost, {
        onSuccess: (response) => {
            alert("게시글이 차단되었습니다.");
            // 차단 게시글리스트 쿼리키 갱신
            queryClient.invalidateQueries("BlockPostList")
            },
            onError: () => {
              alert("오류가 발생하였습니다");
            },
    })

    const handleBlockPost = (postId : string) => {
        postBlockMutation.mutate(postId)
    }

    return (
        <div className="h-screen text-black">
            {post &&
            <div>
                {isDeleteModal ? <DeleteModal postId={post.id} isDeleteModal={isDeleteModal} setIsDeleteModal={setIsDeleteModal}/> : <></>}
                <section className={`${selectImg && "fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"}`}>
                    <PostImageSlider imageUrlList={post.imageUrlList} selectImg={selectImg} setSelectImg={setSelectImg}/>
                </section>
                <section className="pl-5 pr-5 pt-5 flex flex-col space-y-1">
                    <span className="font-bold text-2xl break-all">{post.title}</span>
                </section>
                <section className="p-5">
                    <UserInfo post={post} isDeleteModal={isDeleteModal} setIsDeleteModal={setIsDeleteModal}/>
                </section>
                <section className="pl-5 pr-5 pb-5 flex justify-between space-x-4 font-bold">
                    <div>
                      <span>카테고리 <span className="text-mainColor pr-3">{getCategory(post.category)}</span></span>
                      <span>날짜 <span className="text-mainColor">{post.endDate}</span></span>
                    </div>
                  {isAdmin ? (
                  <button onClick={()=>handleBlockPost(String(post.id))}>
                    <Image src="/images/blockIcon.png" alt="차단하기" width={20} height={20}/>
                  </button> ): (<></>
                  )}
                </section>
                <section className="pl-5 pr-5 pt-2 pb-2">
                    <span className="break-all">{post.content}</span>
                </section>
                <section className="pt-2">
                    <span className="pl-5 text-2xl font-bold">위치</span>
                    <KakaoMap location={post.location} placeName={post.placeName} lat={post.lat} lng={post.lng}/>
                </section>
                {/* 신청자 정보 */}
                {isWriter ? <ChatParticipate applicants={post.applicants} postId={post.id} userId={post.userId}/> : <></>}
                {/* 참가 신청 버튼 */}
                {userInfo.isLoggedIn && !isWriter && !post.isAlreadyApplicant ? <ChatApplication postId={post.id}/> : <></>}
            </div>}
            <div className="h-[80px]" />
        </div>
    )
}

export default Post;