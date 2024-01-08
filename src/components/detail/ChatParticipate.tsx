import { postChatApproval, postChatRefuse } from "@/pages/api/post";
import { ChatApprovalType } from "@/types/postTypes";
import { useMutation } from "react-query";
import UserInfo from "./UserInfo";

const ChatParticipate = ({applicants, postId, userId}: {applicants: ChatApprovalType[], postId: number, userId: number}) => {
    // 아래 모두 본인 작성글에서만 가능
    // 참여 승인
    const approvalMutation = useMutation(postChatApproval, {});
    const handleClickApproval = () => {
        approvalMutation.mutate({postId, userId});
    };

    // 참여 거절 
    const chatRefuseMutation = useMutation(postChatRefuse, {});
    const handleClickRefuse = () => {
        chatRefuseMutation.mutate({postId, userId});
    };

    return (
        <div className="p-2 pt-7">
            <span className="pl-1 pb-4 text-2xl font-bold">👩🏻‍🚀 신청자 정보</span>
            {applicants.map((info: ChatApprovalType) => {
                return (
                    <div key={info.userId} className="flex justify-between items-center">
                        <UserInfo userId={info.userId} nickname={info.nickname} age={info.age} gender={info.gender} imageUrl={info.profileImageUrl}/>
                        <div className="text-sm font-bold text-white mr-7">
                            <button onClick={()=>handleClickApproval()} className="w-16 h-9 bg-mainColor rounded-2xl">참가수락</button>
                            <button onClick={()=>handleClickRefuse()} className="w-16 h-9 bg-mainColor rounded-2xl">참가거절</button>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default ChatParticipate;