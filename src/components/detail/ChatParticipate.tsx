import { ChatApprovalType } from "@/types/postTypes";
import UserInfo from "./UserInfo";
import { useMutation } from "react-query";
import { deleteBusStop, postChatApproval, postChatRefuse } from "@/pages/api/post";

const ChatParticipate = ({ info, postId, userId }: { info:ChatApprovalType, postId: number, userId: number }) => {
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
        <div key={info.userId} className="flex justify-between items-center">
             <UserInfo nickname={info.nickname} age={info.age} gender={info.gender} imageUrl={info.profileImageUrl}/>
             <div className="text-sm font-bold text-white mr-7">
                 <button onClick={()=>handleClickApproval()} className="w-16 h-9 bg-mainColor rounded-2xl">참가수락</button>
                 <button onClick={()=>handleClickRefuse()} className="w-16 h-9 bg-mainColor rounded-2xl">참가거절</button>
             </div>
         </div>
    ) 
}

export default ChatParticipate;