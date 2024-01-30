import { getManagerList } from "@/pages/api/manager"
import { AdminListType } from "@/types/managerTypes";
import React from 'react'
import { useQuery } from "react-query"
import ProfileAtom from "../common/ProfileAtom"

function AdminList() {

  const {data : AdminList} = useQuery("AdminList", getManagerList);

  return (
    <section className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-black">관리자 목록</h1>
        {AdminList && AdminList.map(
           (item : AdminListType, i : number) => (
              <div key={i} className="flex gap-[670px] items-center w-[950px] h-[75px] bg-white rounded-3xl">
                 <ProfileAtom nickname={item.nickname} age={item.age} gender={item.gender} profileImg={item.profileImg}/>
                   {item.super ? (
                   <div className="ml-[30px] font-bold">SUPER</div> ) : (
                   <button className="bg-mainColor w-[95px] h-[33px] rounded-3xl text-white font-semibold">권한 삭제</button>
                   )}
              </div>
            )
       )}
    </section>
  )
}

export default AdminList