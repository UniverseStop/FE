import Image from "next/image";
import { useRouter } from "next/router";
import { PostPreviewType } from "../../types/postTypes";
import { getCategory } from "@/utils/getCategory";
import { getTruncateText } from "@/utils/getTruncateText";

const PostPreview = ({ info, type }: { info: PostPreviewType, type: string }) => {
	// 날짜 포맷 변경 (2024.01.10 수 09:30 => 01.10.수)
	const date = new Date(info.endDate.split(" ")[0].replaceAll(".", "-"));
	const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
	const time = [date.getMonth()+1, date.getDay(), daysOfWeek[date.getDay()]].join(".");

	// 게시물로 이동
	const router = useRouter();
	const handleClickPost = () => {
		router.push(`/detail/${info.id}`);
	};

	// 반응형 고려
	let [textSize, titleSize] = ["text-sm", "text-lg"];
	if (type === "aboutus") {
		textSize = "text-xl";
		titleSize = "text-2xl";
	}

	return (
		<button onClick={handleClickPost} className="w-full h-full max-w-[600px] p-3 text-white rounded-[20px] flex flex-col justify-between relative"
        style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.1)), url(${info.thumbnailImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundBlendMode: "multiply",
        }}>
			<section className="flex justify-between w-full">
				<div className="flex items-center space-x-1">
					<div>
						<img className="rounded-full w-12 h-12" alt="profile" src={info.profileImageUrl}/>
					</div>
					<div className="flex flex-col text-start ">
						<span className={`${textSize} font-medium`}>{info.nickname}</span>
						<span className="text-xs">{info.age}세</span>
					</div>
				</div>
				<div className="pt-1">
					<span className="text-xs">{time}</span>
				</div>
			</section>
			<section className="space-y-2">
				<div className="flex flex-col items-start">
					<span className={`${titleSize} font-medium`}>{getTruncateText(info.title, 10)}</span>
					<span className={`${textSize} w-20 border rounded-[20px]`}>{getCategory(info.category)}</span>
				</div>
				<div className="flex space-x-1 items-center">
					<img className="w-3" alt="location" src="/images/location.png"/>
					<span className="text-xs">{getTruncateText(info.location, 15)}</span>
				</div>
			</section>
		</button>
	);
};

export default PostPreview;
