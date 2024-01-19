import { UserType } from "@/types/managerTypes";
import { convertTime } from "@/utils/convertTime";
import { getGender } from "@/utils/getGender";

const ManagementTable = ({users, totalPages, selectPage, setSelectPage, selectBox, setSelectBox}: {users: UserType[], totalPages: number, selectPage: number, setSelectPage: (selectPage: number) => void, selectBox: number[], setSelectBox: (selectBox: number[]) => void}) => {
    const handleCheckBox = (userId: number) => {
        let temps = [...selectBox]; // 기존에 선택된 유저 임시로 저장
        if (!temps.includes(userId)) temps.push(userId); // 선택된적 없는 유저면 추가
        else temps = temps.filter(id => id !== userId); // 선택된적 있던 유저면 제거
        setSelectBox(temps);
    };

    return (
        <section className="w-[600px] border border-managerPointColor rounded-sm">
            <table className="text-xs whitespace-no-wrap w-full">
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
                        <tr className="border-b border-managerGrayColor h-[70px] text-center" key={u.id}>
                            <td className="flex justify-center items-center space-x-3 h-[70px]">
                                <input onClick={()=>handleCheckBox(u.id)} type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
                                <img className="border border-gray w-[50px] h-[50px] rounded-full" alt="profile" src={u.profileImageUrl} />
                            </td>
                            <td>{u.nickname}</td>
                            <td>{u.id}</td>
                            <td>{convertTime(u.lastAccessed)}</td>
                            <td>{u.age}</td>
                            <td>{getGender(u.gender)}</td>
                            <td>{u.mannerTemplate}</td>
                            <td>{u.reportCount}</td>
                        </tr>);
                    })}
                </tbody>
            </table>
            <ul className="flex justify-end space-x-5 pt-5 pr-10">
                {Array.from({ length: totalPages }, (_, index: number) => (
                    <button key={index} onClick={()=>setSelectPage(index)} className={`${selectPage === index ? "font-bold underline" : "text-gray"}`}>{index + 1}</button>
                ))}
            </ul>
        </section>
    )
}

export default ManagementTable;