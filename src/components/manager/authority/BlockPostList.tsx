import { getBlockPostList } from "@/pages/api/manager";
import Image from "next/image"
import React from 'react'
import { useQuery } from "react-query";
import ProfileAtom from "../common/ProfileAtom"

function BlockPostList() {

  const { data: BlockPostList, refetch } = useQuery("BlockPostList", getBlockPostList);

  console.log('BlockPostList :>> ', BlockPostList);

  return (
    <section className="flex flex-col gap-5 mt-[20px]">
    <h1 className="text-2xl font-bold text-black">차단된 게시물 목록</h1>
    {BlockPostList && BlockPostList.map((item : any, i: number)=> (
      <div className="flex items-center w-[950px] h-[75px] bg-white rounded-3xl gap-5">
          <button className="flex items-center gap-[100px] w-[600px]">
            <ProfileAtom nickname={item.authorNickname} age={item.authorAge} gender={item.authorGender} profileImg={item.authorImg}/>
             <div className="text-lg font-semibold">{item.postTitle.replace(/\[차단 된 게시물\]/g, '')}</div>
             <div>차단 일시 : {item.blockedDate}</div>
           </button>
           <div className="flex gap-7 ml-[170px]">
             <button> <Image width={22} height={22} src="/images/authority-return.png" alt="되돌리기버튼"/> </button>
             <button> <Image width={20} height={20} src="/images/authority-trash.png" alt="영구삭제버튼"/> </button>
           </div>
      </div>
    ))}

</section>
  )
}

export default BlockPostList