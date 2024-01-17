import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { postChatApproval, postChatRefuse } from "@/pages/api/post";
import { ChatApprovalType } from "@/types/postTypes";
import { getGender } from "@/utils/getGender";

const ChatParticipate = ({applicants, postId, userId}: {applicants: ChatApprovalType[], postId: number, userId: number}) => {
    const router = useRouter();

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
            <span className="pl-1 pb-4 text-2xl font-bold">신청자 정보</span>
            {applicants.map((info: ChatApprovalType) => {
                return (
                    <div className="flex justify-between items-center p-4 border-b-2 border-managerGrayColor" key={info.userId}>
                        <button onClick={()=>router.push(`/mypage/${info.userId}`)} className="flex space-x-4 items-center">
                            <img className="w-[60px] h-[60px] rounded-full" alt="profile" src={info.profileImageUrl}/>
                            <div className="flex flex-col text-start">
                                <span className="font-bold">{info.nickname}</span>
                                <span className="text-xs">{info.age}세 • {getGender(info.gender)}</span>
                            </div>
                        </button>
                        <div className="space-x-2 text-gray">
                            <button onClick={()=>handleClickApproval(info.userId)} className="hover:text-black hover:font-bold">수락</button>
                            <button onClick={()=>handleClickRefuse(info.userId)} className="hover:text-black hover:font-bold">거절</button>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default ChatParticipate;