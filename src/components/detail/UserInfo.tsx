import { GetCurrentUser } from "@/utils/getCurrentUser";
import { getGender } from "@/utils/getGender";
import { useRouter } from "next/router";

const UserInfo = ({ userId, nickname, age, gender, imageUrl, isDeleteModal, setIsDeleteModal}: { userId: number, nickname: string, age: number, gender: string, imageUrl: string, isDeleteModal?: boolean, setIsDeleteModal?: (isDeleteModal: boolean) => void}) => {
    const userInfo = GetCurrentUser(); // 현재 로그인된 사용자 정보

    // 마이페이지로 이동
    const router = useRouter();

    return (
        <div className="flex relative">
            <button onClick={()=>router.push(`/mypage/${userId}`)} className="flex">
                <img className="w-[60px] h-[60px] rounded-full" alt="profile" src={imageUrl}/>
                <div className="flex flex-col pl-3 pt-2">
                    <span className="text-2xl font-bold pr-10">{nickname}</span>
                    <div className="flex">
                        <span className="text-sm">만{age}세 • {getGender(gender)} </span>
                    </div>
                </div>
            </button>
            {Number(userInfo.userId) === userId && setIsDeleteModal && <button className="absolute top-[41px] left-[140px] w-4 h-4" onClick={()=>setIsDeleteModal(!isDeleteModal)}><img alt="postTrash" src="/images/postTrash.png"/></button>}
        </div>
    )
}

export default UserInfo;