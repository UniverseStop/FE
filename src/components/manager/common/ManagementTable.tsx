import { useState } from "react";
import { UserType } from "@/types/managerTypes";
import { convertTime } from "@/utils/convertTime";
import { getGender } from "@/utils/getGender";
import ManagementModal from "./ManagementModal";

const ManagementTable = ({users, totalPages, selectPage, setSelectPage, selectBox, setSelectBox}: {users: UserType[], totalPages: number, selectPage: number, setSelectPage: (selectPage: number) => void, selectBox: number[], setSelectBox: (selectBox: number[]) => void}) => {
    const handleCheckBox = (event: React.MouseEvent<HTMLInputElement>, userId: number) => { // 시용자 선택
        event.stopPropagation(); // 체크박스 선택 시에는 상세 정보 안열기
        let temps = [...selectBox]; // 임시로 기존 선택 유저 ID 저장
        if (!temps.includes(userId)) temps.push(userId); // 선택된적 없는 유저인 경우 추가
        else temps = temps.filter(id => id !== userId); // 선택된적 있던 유저인 경우 제거
        setSelectBox(temps);
    };

    // 사용자 정보 상세 모달
    const [isModal, setIsModal] = useState<boolean>(false); // false: 안열기, true: 열기
    const [selectUserInfo, setSelectUserInfo] = useState<UserType>();
    const handleClickUser = (userInfo: UserType) => {
        setSelectUserInfo(userInfo); // 선택된 유저 정보 저장
        setIsModal(!isModal); // 상세 모달 열기로 변경
    };

    return (
        <div className="w-[600px] h-[815px] border border-managerPointColor rounded-sm">
            {isModal && selectUserInfo ? <ManagementModal isModal={isModal} setIsModal={setIsModal} selectUserInfo={selectUserInfo} setSelectUserInfo={setSelectUserInfo}/> : <></>}
            <table className="text-xs whitespace-no-wrap w-full ">
                <thead className="bg-managerGrayColor">
                    <tr>
                        {["프로필 이미지", "닉네임", "ID", "최근 접속 일시", "나이", "성별", "온도", "신고 횟수"].map((name, index) => {
                            return <th scope="col" className="text-center px-3 py-5" key={index}>{name}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((u: UserType) => {
                        return (
                            <tr onClick={()=>handleClickUser(u)} className="cursor-pointer border-b border-managerGrayColor h-[70px] text-center" key={u.id}>
                                <td className="flex justify-center items-center space-x-3 h-[70px]">
                                    <input onClick={(event) => handleCheckBox(event, u.id)} type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
                                    <img className="border border-gray w-[50px] h-[50px] rounded-full" alt="profile" src={u.profileImageUrl} />
                                </td>
                                <td>{u.nickname}</td>
                                <td>{u.id}</td>
                                <td>{convertTime(u.lastAccessed)}</td>
                                <td>{u.age}</td>
                                <td>{getGender(u.gender)}</td>
                                <td>{u.mannerTemplate}</td>
                                <td>{u.reportCount}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <ul className="flex justify-end space-x-5 pt-5 pr-10">
                {Array.from({ length: totalPages }, (_, index: number) => (
                    <button key={index} onClick={()=>setSelectPage(index)} className={`${selectPage === index ? "font-bold underline" : "text-gray"}`}>{index + 1}</button>
                ))}
            </ul>
        </div>
    )
}

export default ManagementTable;