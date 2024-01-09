import Image from "next/image";
import { PostPreviewType } from "../../types/postTypes";
import { getCategory } from "@/utils/getCategory";

const PostDetail = ({ info, hSize, wSize }: { info: PostPreviewType; hSize: string; wSize: string }) => {
	// 날짜 변경
	const date = new Date(info.endDate);
	const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
	const time = [date.getMonth(), date.getDay(), daysOfWeek[date.getDay()]].join(".");

	return (
		<li
			className={`${wSize} ${hSize} max-w-[600px] p-4 text-white rounded-[20px] flex flex-col justify-between relative`}
			style={{
				position: "relative",
				backgroundImage: `url()`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}>
			<div className="relative z-10 flex justify-between">
				<div className="flex">
					<div>
						<img className="rounded-full w-[55px] h-[56px]" alt="profile" src={info.profileImageUrl} />
					</div>
					<div className="flex flex-col pl-2 pt-2">
						<span className="font-bold">{info.nickname}</span>
						<span className="text-xs">{info.age}세</span>
					</div>
				</div>
				<div className="pt-2 text-xs">
					<span className="font-bold">{time}</span>
				</div>
			</div>
			<div className="relative z-10">
				<span className="text-xl font-bold">
					{info.title.length > 10 ? info.title.substring(0, 9) + "..." : info.title}
				</span>
				<ul className="pt-2">
					<li className="flex justify-center text-sm w-[80px] h-[24px] border rounded-[20px]">
						{getCategory(info.category)}
					</li>
				</ul>
				<div className="flex pt-2">
					<Image width={12} height={20} alt="location" src="/images/location.png" />
					<span className="pl-1 text-xs">{info.location}</span>
				</div>
			</div>
			<div
				className="absolute inset-0 rounded-[20px] bg-black bg-opacity-30"
				style={{ content: "", display: "block" }}
			/>
		</li>
	);
};

export default PostDetail;
