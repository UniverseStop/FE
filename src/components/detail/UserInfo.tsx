import { useAuth } from "@/context/KakaoContext";
import { getGender } from "@/utils/getGender";

const UserInfo = ({ userId, nickname, age, gender, imageUrl, isDeleteModal, setIsDeleteModal}: { userId: number, nickname: string, age: number, gender: string, imageUrl: string, isDeleteModal?: boolean, setIsDeleteModal?: (isDeleteModal: boolean) => void}) => {
    const { userInfo } = useAuth(); // 현재 로그인된 사용자 정보

    return (
        <div className="flex">
            <img className="w-[60px] h-[60px] rounded-full" alt="profile" src={imageUrl}/>
            <div className="flex flex-col pl-3 pt-2">
                <span className="text-2xl font-bold">{nickname}</span>
                <div className="flex">
                    <span className="text-sm">만{age}세 • {getGender(gender)} </span>
                    {userInfo && userInfo.userId === userId && setIsDeleteModal && <button className="ml-1 w-4 h-4" onClick={()=>setIsDeleteModal(!isDeleteModal)}><img alt="postTrash" src="/images/postTrash.png"/></button>}
                </div>
            </div>
        </div>
    )
}

export default UserInfo;