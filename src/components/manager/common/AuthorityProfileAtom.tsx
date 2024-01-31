import React from 'react'

function AuthorityProfileAtom({nickname, age, gender, profileImg}: {nickname: string; age: string; gender: string; profileImg: string;}) {
  return (
    <div className="flex ml-5 gap-5 mt-2 w-[180px]">
        <div className="bg-managerGrayColor rounded-full w-[50px] h-[50px]">
          <img className="rounded-full w-[50px] h-[50px]" src={profileImg} alt="프로필이미지" />
        </div>
        <div className="flex flex-col">
            <p className="font-bold">{nickname}</p>
            <div className="flex ">
                <div>만{age}세</div>
                <div className="ml-1">• {gender}</div>
            </div>
        </div>
    </div>
  )
}

export default AuthorityProfileAtom