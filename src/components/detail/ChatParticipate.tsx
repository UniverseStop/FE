import { postChatApproval, postChatRefuse } from "@/pages/api/post";
import { ChatApprovalType } from "@/types/postTypes";
import { useMutation, useQueryClient } from "react-query";
import UserInfo from "./UserInfo";

const ChatParticipate = ({applicants, postId, userId}: {applicants: ChatApprovalType[], postId: number, userId: number}) => {
    // 아래 모두 본인 작성글에서만 가능
    // 참여 승인
    const queryClient = useQueryClient();
    const approvalMutation = useMutation(postChatApproval, {
        onSuccess: () => {
            queryClient.invalidateQueries("post");
            alert("참가 수락을 성공했습니다.");
        },
        onError: () => {
            alert("참가 수락을 실패했습니다.");
        },
    });
    const handleClickApproval = (id: number) => {
        approvalMutation.mutate({postId, userId: id});
    };

    // 참여 거절
    const chatRefuseMutation = useMutation(postChatRefuse, {
        onSuccess: () => {
            queryClient.invalidateQueries("post");
            alert("참가 거절을 성공했습니다.");
        },
        onError: () => {
            alert("참가 거절을 실패했습니다.");
        },
    });
    const handleClickRefuse = (id: number) => {
        chatRefuseMutation.mutate({postId, userId: id});
    };

    return (
        <div className="p-2 pt-7">
            <span className="pl-1 pb-4 text-2xl font-bold">👩🏻‍🚀 신청자 정보</span>
            {applicants.map((info: ChatApprovalType) => {
                return (
                    <div key={info.userId} className="flex justify-between items-center">
                        <UserInfo userId={info.userId} nickname={info.nickname} age={info.age} gender={info.gender} imageUrl={info.profileImageUrl}/>
                        <div className="text-sm font-bold text-white mr-7 space-x-2">
                            <button onClick={()=>handleClickApproval(info.userId)} className="w-16 h-9 bg-mainColor rounded-2xl">참가수락</button>
                            <button onClick={()=>handleClickRefuse(info.userId)} className="w-16 h-9 bg-mainColor rounded-2xl">참가거절</button>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default ChatParticipate;