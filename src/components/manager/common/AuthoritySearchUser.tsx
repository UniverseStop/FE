import { getAllUserList, postAddManager } from "@/pages/api/manager";
import { UserSearchListType } from "@/types/managerTypes";
import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from "react-query";
import ProfileAtom from "./AuthorityProfileAtom";

function AuthoritySearchUser() {
  const [userNickname, setUserNickname] = useState<string>("");
  const [isResultModalState, setIsResultModalState] = useState<boolean>(false);
  const { data: AllUserList, refetch } = useQuery("AllUserList", ()=> getAllUserList(userNickname));
  const queryClient = useQueryClient();

  const handleNicknameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setUserNickname(e.target.value)
  }
  //유저검색 버튼 눌렀을때
  const handleUserSearch = () => {
    refetch();
    setIsResultModalState(true);
  }
    /** 통신로직 */
    const postAddMutation = useMutation(postAddManager, {
      onSuccess: (response) => {
      alert("관리자로 추가되었습니다.");
      // 관리자리스트 쿼리키 갱신
      queryClient.invalidateQueries("AdminList")
      queryClient.invalidateQueries("AllUserList")
      },
      onError: () => {
        alert("오류가 발생하였습니다");
      },
     })

  //관리자추가 버튼 눌렀을때
  const handleAddManager = (nickname : string) => {
      postAddMutation.mutate(nickname)
  }


  return (
    <div>
      <section>
        <h1 className="text-2xl font-bold mb-2 text-black">사용자 검색</h1>
          <div className="flex gap-[210px] w-[950px] h-[75px] bg-white rounded-3xl">
              <input value={userNickname} onChange={handleNicknameChange} type="text" placeholder="닉네임을 입력해주세요" maxLength={7} className="ml-6 mt-5 w-[600px] h-[40px] focus:outline-none" />
              <button onClick={handleUserSearch} className="bg-mainColor w-[95px] h-[33px] rounded-3xl mt-5 text-white font-semibold">유저 검색</button>
          </div>
      </section>
           { isResultModalState && (
            <div onClick={()=>setIsResultModalState(false)} className="flex items-center justify-center fixed top-0 left-0 bg-[rgba(0,0,0,0.6)] w-full h-full">
                <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-3 items-center bg-managerGrayColor w-[900px] h-[500px] rounded-3xl">
                   <p className="text-xl m-2 2 2 2">{userNickname}(으)로 검색한 유저 리스트입니다.</p>
                   <div className="flex flex-col h-[300px]">
                     {AllUserList && AllUserList.data.data.map((item:UserSearchListType, i : number) => (
                        item.role === "USER" && (
                          <div key={i} className="flex flex-col gap-5 h-[300px]">
                              <div className="flex items-center gap-[550px] bg-white w-[870px] h-[75px] rounded-3xl">
                                 <ProfileAtom nickname={item.nickname} age={item.age} gender={item.gender} profileImg={item.profileImg} />
                                 <button onClick={()=>handleAddManager(item.nickname)} className="bg-mainColor w-[95px] h-[33px] rounded-3xl text-white font-semibold">관리자 추가</button>
                             </div>
                          </div>
                      )))}
                    </div>
                </div>
            </div>
         )
         }
     </div>

  )
}

export default AuthoritySearchUser;