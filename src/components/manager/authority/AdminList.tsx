import { getManagerList, postDeleteManager } from "@/pages/api/manager"
import { AdminListType } from "@/types/managerTypes";
import { GetCurrentUser } from "@/utils/getCurrentUser";
import React from 'react'
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query"
import ProfileAtom from "../common/ProfileAtom"

function AdminList() {

  const userInfo = GetCurrentUser();
  const isSuperAdmin = userInfo.auth === "SUPER"; // 슈퍼관리자 계정 유무
  const {data : AdminList} = useQuery("AdminList", getManagerList);
  const queryClient = useQueryClient();

    /** 통신로직 */
    const postDeleteMutation = useMutation(postDeleteManager, {
      onSuccess: (response) => {
        alert("권한이 삭제되었습니다.");
        // 관리자리스트 쿼리키 갱신
        queryClient.invalidateQueries("AdminList")
        },
        onError: () => {
          alert("오류가 발생하였습니다");
        },
    })

  //권한 삭제 버튼 눌렀을때
  const handleDeleteManager = (nickname : string) => {
    if(!isSuperAdmin) {
      alert("권한이 없습니다.")
    } else {
      postDeleteMutation.mutate(nickname)
    }
  }

  return (
    <section className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-black">관리자 목록</h1>
          {AdminList && AdminList.sort((a : AdminListType, b : AdminListType) => (b.super ? 1 : -1)).map((item: AdminListType, i: number) => (
            <div key={i} className="flex gap-[630px] items-center w-[950px] h-[75px] bg-white rounded-3xl">
                <ProfileAtom nickname={item.nickname} age={item.age} gender={item.gender} profileImg={item.profileImg} />
                  {item.super ? ( <div className="ml-[30px] font-bold">SUPER</div>)
                  : (<button onClick={()=>handleDeleteManager(item.nickname)} className="bg-mainColor w-[95px] h-[33px] rounded-3xl text-white font-semibold">권한 삭제</button> )}
            </div>
          ))}
    </section>
  )
}

export default AdminList