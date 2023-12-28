import { getGender } from "@/utils/getGender";

const UserInfo = ({nickname, age, gender, imageUrl, isDeleteModal, setIsDeleteModal}: {nickname: string, age: number, gender: string, imageUrl: string, isDeleteModal?: boolean, setIsDeleteModal?: (isDeleteModal: boolean) => void}) => {
    return (
        <div className="flex">
            <img className="w-[60px] h-[60px] rounded-full" alt="profile" src={imageUrl}/>
            <div className="flex flex-col pl-3 pt-2">
                <span className="text-2xl font-bold">{nickname}</span>
                <div className="flex">
                    <span className="text-sm">만{age}세 • {getGender(gender)} </span>
                    {setIsDeleteModal && <button className="ml-1 w-4 h-4" onClick={()=>setIsDeleteModal(!isDeleteModal)}><img alt="postTrash" src="/images/postTrash.png"/></button>}
                </div>
            </div>
        </div>
    )
}

export default UserInfo;