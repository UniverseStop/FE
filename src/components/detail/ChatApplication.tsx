import { postChatApplication } from "@/pages/api/post";
import { useMutation, useQueryClient } from "react-query";

const ChatApplication = ({ postId }: { postId: number }) => {
    // 참가 신청 (다른 사용자 글에만 가능)
    const queryClient = useQueryClient();
    const applicationMutation = useMutation(postChatApplication, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["bus", postId]})

        }
    });
    const handleClickApplication = () => {
        applicationMutation.mutate(postId);
    };
    
    return (
        <section className="fixed bottom-5 right-10 z-50">
            <button onClick={() => handleClickApplication()} className="w-[100px] h-[100px] flex flex-col justify-center items-center rounded-full bg-white">
                <img className="w-[70px] h-[70px]" alt="application" src="/images/application.png"/>
                <span className="font-bold text-xs">참가신청</span>
            </button>
        </section>
    )
}

export default ChatApplication;