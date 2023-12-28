import { useMutation } from "react-query";
import { deleteBusStop } from "@/pages/api/post";

const DeleteModal = ({postId, isDeleteModal, setIsDeleteModal}: {postId: number, isDeleteModal: boolean, setIsDeleteModal: (isDeleteModal: boolean) => void}) => {
    // 게시물 삭제
    const deletePostMutation = useMutation(deleteBusStop, {});
    const handleClickDelete = () => {
        deletePostMutation.mutate(postId);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <article className="bg-white p-8 w-9/12 max-w-[515px] h-full min-h-[200px] max-h-[360px] rounded-lg z-50">
                <div className="flex flex-col items-center">
                    <section className="flex flex-col items-center">
                        <span className="font-bold text-xl">정말로 삭제하시겠습니까?</span>
                        <span className="text-sm text-[#A8A8AA]">삭제된 게시글은 복구되지 않습니다.</span>
                    </section>
                    <section className="pt-1">
                        <img alt="deleteGhost" src="/images/deleteGhost.png"/>
                    </section>
                    <section className="pt-7 flex justify-between font-bold text-xl w-[85%] space-x-2">
                        <button onClick={()=>setIsDeleteModal(!isDeleteModal)} className="w-3/5 h-12 text-mainColor border border-mainColor rounded-3xl">취소하기</button>
                        <button onClick={()=>handleClickDelete()} className="w-3/5 h-12 text-white bg-mainColor rounded-3xl">삭제하기</button>
                    </section>
                </div>
            </article>
        </div>
    )
}

export default DeleteModal;