import { useMutation } from "react-query";
import { deleteBusStop } from "@/pages/api/post";
import { useRouter } from "next/router";

const DeleteModal = ({postId, isDeleteModal, setIsDeleteModal}: {postId: number, isDeleteModal: boolean, setIsDeleteModal: (isDeleteModal: boolean) => void}) => {
    // 게시물 삭제
    const router = useRouter();
    const deletePostMutation = useMutation(deleteBusStop, {
        onSuccess: () => {
            router.push("/main");
        },
        onError: (error) => {
            alert("게시물이 삭제되지 못했습니다.");
        },
    });
    const handleClickDelete = () => {
        deletePostMutation.mutate(postId);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <article className="bg-white p-8 w-[300px] h-[200px] rounded-lg z-50 justify-center items-center flex">
                <div className="flex flex-col items-center">
                    <section className="flex flex-col items-center">
                        <span className="font-bold text-xl">정말로 삭제하시겠습니까?</span>
                        <span className="text-sm text-[#A8A8AA]">삭제된 게시글은 복구되지 않습니다.</span>
                    </section>
                    <section className="pt-7 flex justify-between font-bold text-sm w-[85%] space-x-2">
                        <button onClick={()=>setIsDeleteModal(!isDeleteModal)} className="w-3/5 h-10 text-mainColor border border-mainColor rounded-xl">취소하기</button>
                        <button onClick={()=>handleClickDelete()} className="w-3/5 h-10 text-white bg-mainColor rounded-xl">삭제하기</button>
                    </section>
                </div>
            </article>
        </div>
    )
}

export default DeleteModal;