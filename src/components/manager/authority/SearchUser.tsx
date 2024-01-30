import { getAllUserList, postAddManager } from "@/pages/api/manager";
import { UserSearchListType } from "@/types/managerTypes";
import React, { useState } from 'react'
import { useMutation, useQuery } from "react-query";
import ProfileAtom from "../common/ProfileAtom";

function SearchUser() {
  const [userNickname, setUserNickname] = useState<string>("");
  const [isResultModalState, setIsResultModalState] = useState<boolean>(false);
  const handleNicknameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setUserNickname(e.target.value)
  }

  const { data: AllUserList, refetch } = useQuery("AllUserList", ()=> getAllUserList(userNickname));

  const getUserInfo = () => {
    refetch();
    setIsResultModalState(true);
  }

    /** 통신로직 */
    const postAddMutation = useMutation(postAddManager, {
      onSuccess: (response) => {
    alert("관리자로 추가되었습니다.");

  },
  onError: () => {
    alert("오류가 발생하였습니다");
  },
  })

  // const handleAddManager = (nickname : string) => {
  //     postAddMutation.mutate(nickname)
  // }

  return (
    <>
      <section>
        <h1 className="text-2xl font-bold mb-2 text-black">사용자 검색</h1>
          <div className="flex gap-[210px] w-[950px] h-[75px] bg-white rounded-3xl">
              <input value={userNickname} onChange={handleNicknameChange} type="text" placeholder="닉네임을 입력해주세요" maxLength={7} className="ml-6 mt-5 w-[600px] h-[40px] focus:outline-none" />
              <button onClick={getUserInfo} className="bg-mainColor w-[95px] h-[33px] rounded-3xl mt-5 text-white font-semibold">유저 검색</button>
          </div>
      </section>
           { isResultModalState && (
            <div onClick={()=>setIsResultModalState(false)} className="flex items-center justify-center fixed top-0 left-0 bg-[rgba(0,0,0,0.6)] w-full h-full">
                <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-2 items-center bg-managerGrayColor w-[900px] h-[500px] rounded-3xl">
                   <p className="text-xl m-2 2 2 2">{userNickname}(으)로 검색한 유저 리스트입니다.</p>
                     {AllUserList && AllUserList.data.data.map((item:UserSearchListType, i : number) => (
                       <div key={i} className="flex flex-col gap-5 h-[400px] overflow-y-scroll">
                          <div className="flex items-center gap-[580px] bg-white w-[870px] h-[75px] rounded-3xl">
                              <ProfileAtom nickname={item.nickname} age={item.age} gender={item.gender} profileImg={item.profileImg} />
                              <button className="bg-mainColor w-[95px] h-[33px] rounded-3xl text-white font-semibold">관리자 추가</button>
                          </div>
                       </div>
                      ))}
                </div>
            </div>
         )
         }
     </>

  )
}

export default SearchUser