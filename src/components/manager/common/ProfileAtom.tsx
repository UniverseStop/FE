import React from 'react'

function ProfileAtom() {
  return (
    <div className="flex ml-5 gap-5 mt-2">
        <div className="bg-managerGrayColor rounded-full w-[50px] h-[50px]">

        </div>
        <div className="flex flex-col">
            <p className="font-bold">은지님 배고파</p>
            <div className="flex ">
                <div>만20세</div>
                <div className="ml-1">• 여</div>
            </div>
        </div>
    </div>
  )
}

export default ProfileAtom