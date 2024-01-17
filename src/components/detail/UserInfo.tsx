import { PostDetailType } from "@/types/postTypes";
import { GetCurrentUser } from "@/utils/getCurrentUser";
import { getGender } from "@/utils/getGender";
import { useRouter } from "next/router";

const UserInfo = ({ post, isDeleteModal, setIsDeleteModal}: { post: PostDetailType, isDeleteModal?: boolean, setIsDeleteModal?: (isDeleteModal: boolean) => void}) => {
    const userInfo = GetCurrentUser(); // 현재 로그인된 사용자 정보

    // 마이페이지로 이동
    const router = useRouter();

    return (
        <div className="flex flex-row justify-between">
            <button onClick={()=>router.push(`/mypage/${post.userId}`)} className="flex items-center text-start space-x-4">
                <img className="w-[60px] h-[60px] rounded-full" alt="profile" src={post.profileImageUrl}/>
                <div className="flex flex-col">
                    <span className="text-xl font-bold">{post.nickname}</span>
                    <span className="text-sm">{post.age}세 • {getGender(post.gender)}</span>
                </div>
            </button>
            <div className="flex flex-col">
                <span>{post.createdAt.split("T")[0].replaceAll("-", ".")}</span>
                {Number(userInfo.userId) === post.userId && setIsDeleteModal && <button onClick={()=>setIsDeleteModal(!isDeleteModal)} className="flex justify-end pt-1"><img className="w-4 h-4" alt="postTrash" src="/images/postTrash.png"/></button>}
            </div>
        </div>
    )
}

export default UserInfo;