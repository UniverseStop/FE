import { deleteRemovePost, getBlockPostList, postBackBlockedlPost } from "@/pages/api/manager";
import Image from "next/image"
import { useRouter } from "next/router";
import React from 'react'
import { useMutation, useQuery, useQueryClient } from "react-query";
import ProfileAtom from "../common/ProfileAtom"

function BlockPostList() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: BlockPostList, refetch } = useQuery("BlockPostList", getBlockPostList);

  // 차단해제
  const cancelBlockMutation = useMutation(postBackBlockedlPost, {
    onSuccess: (response) => {
        alert("게시글이 차단이 해제되었습니다.");
        // 차단 게시글리스트 쿼리키 갱신
        queryClient.invalidateQueries("BlockPostList")
        },
        onError: () => {
          alert("오류가 발생하였습니다");
        },
})

const handleCancelBlockPost = (postId : string) => {
    cancelBlockMutation.mutate(postId)
}

// 영구삭제
const removePostMutation = useMutation(deleteRemovePost, {
  onSuccess: (response) => {
      alert("게시글이 영구삭제 되었습니다.");
      // 차단 게시글리스트 쿼리키 갱신
      queryClient.invalidateQueries("BlockPostList")
      },
      onError: () => {
        alert("오류가 발생하였습니다");
      },
})

const handleRemovePost = (postId : string) => {
  removePostMutation.mutate(postId)
}

  return (
    <section className="flex flex-col gap-5 mt-[20px]">
    <h1 className="text-2xl font-bold text-black">차단된 게시물 목록</h1>
    {BlockPostList && BlockPostList.map((item : any, i: number)=> (
      <div className="flex items-center w-[950px] h-[75px] bg-white rounded-3xl gap-5">
            <ProfileAtom nickname={item.authorNickname} age={item.authorAge} gender={item.authorGender} profileImg={item.authorImg}/>
           <button onClick={()=>(router.push(`/detail/${item.postId}`))} className="flex w-[430px] items-center justify-between">
                <div className="text-lg font-semibold">{item.postTitle.replace(/\[차단 된 게시물\]/g, '')}</div>
                <div>차단 일시 : {item.blockedDate}</div>
           </button>
           <div className="flex gap-7 ml-[170px]">
             <button onClick={()=>handleCancelBlockPost(item.postId)}> <Image width={22} height={22} src="/images/authority-return.png" alt="되돌리기버튼"/> </button>
             <button onClick={()=>handleRemovePost(item.postId)}> <Image width={20} height={20} src="/images/authority-trash.png" alt="영구삭제버튼"/> </button>
           </div>
      </div>
    ))}

</section>
  )
}

export default BlockPostList