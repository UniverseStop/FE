import Image from "next/image";
import { PostPreviewType } from "../../types/postTypes";

const PostDetail = ({ info }: { info: PostPreviewType }) => {
    return (
        <li className="w-[190px] h-[190px] p-4 text-white rounded-[20px] flex flex-col justify-between relative"
        style={{
            position: "relative",
            backgroundImage: `url(${info.imageUrlList[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}>
            <div className="relative z-10 flex justify-between">
                <div className="flex">
                    <div>
                        <img className="rounded-full w-[55px] h-[56px]" alt="profile" src={info.profileImageUrl}/>
                    </div>
                    <div className="flex flex-col pl-2 pt-2">
                        <span className="font-bold">{info.nickname}</span>
                        <span className="text-[10px]">{info.age}세</span>
                    </div>
                </div>
                <div className="pt-2 text-[10px]">
                    <span>{info.endDate}</span>
                </div>
            </div>
            <div className="relative z-10">
                <span className="text-[20px] font-bold">{info.title}</span>
                <ul className="pt-2">
                    <li className="flex justify-center text-[15px] w-[80px] h-[24px] border rounded-[20px]">{info.category}</li>
                </ul>
                <div className="flex pt-2">
                    <Image width={12} height={20} alt="location" src="/images/location.png" />
                    <span className="pl-1 text-[10px]">{info.location}</span>
                </div>
            </div>
            <div className="absolute inset-0 rounded-[20px] bg-black bg-opacity-30" style={{ content: "", display: "block" }} />
        </li>
    );
};

export default PostDetail;