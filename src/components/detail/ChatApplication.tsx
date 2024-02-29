import { postChatApplication } from "@/pages/api/post";
import { useMutation, useQueryClient } from "react-query";

const ChatApplication = ({ postId }: { postId: number }) => {
    // 참가 신청 (다른 사용자 글에만 가능)
    const queryClient = useQueryClient();
    const applicationMutation = useMutation(postChatApplication, {
        onSuccess: () => {
            queryClient.invalidateQueries("post");
        }
    });
    const handleClickApplication = () => {
        applicationMutation.mutate(postId);
    };

    return (
        <div className="fixed bottom-5 pr-5 pb-[61px] w-full max-w-[600px] flex justify-end z-50">
            <div onClick={() => handleClickApplication()} className="cursor-pointer w-[70px] h-[70px] rounded-full flex flex-col justify-center items-center bg-white hover:overflow-visible">
                <img className="w-9" alt="application" src="/images/application.png"/>
                <span className="absolute pt-3 text-xs font-bold top-10 opacity-0 hover:opacity-100 transition-opacity">참가 신청</span>
            </div>
        </div>
    )
}

export default ChatApplication;