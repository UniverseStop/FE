import React, { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import Image from "next/image";
import { postReportUser } from "../api/user";
import { ConfirmPermissions } from "@/utils/confirmPermissions";

const UserReport = () => {
	ConfirmPermissions(); // 로그인 후 이용가능한 페이지

	const [selectedReason, setSelectedReason] = useState<string>("");
	const [reportDetail, setReportDetail] = useState<string>("")
	const [reportImage, setReportImage] = useState<File[]>([]);
	const [selectedFileNames, setSelectedFileNames] = useState<string[]>([]);
	const router = useRouter();
	const handleCancel = () => {
		router.back();
	};
	const reasons = {
		"성적인 콘텐츠": "SEXUAL_CONTENT",
		"폭력적 또는 괴롭힘": "BULLYING",
		"잘못된 정보": "MISINFORMATION",
		"스팸 또는 광고성 콘텐츠": "SPAM",
		"기타": "OTHER",
		};

	const handleReasonChange = (reason: string) => {
		setSelectedReason(reason);
	};

	const handleReportDetailChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const userInpurText = e.target.value;
		setReportDetail(userInpurText)
	}

	const reportData = {
		report: selectedReason,
		reportDetail : reportDetail
	};

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const targetFiles = e.target.files as FileList;
		const selectedFiles: File[] = Array.from(targetFiles);
		const newFileNames: string[] = [];
		for(let i=0; i<selectedFiles.length; i++) {
			let maxSize = 20 * 1024 * 1024;
			if(selectedFiles[i].size > maxSize) {
				alert("첨부파일 사이즈는 20MB 이내로 등록 가능합니다.")
				return;
			}
			newFileNames.push(selectedFiles[i].name);
		}
		setReportImage((prev) => [...prev, ...selectedFiles]);
		setSelectedFileNames((prev) => [...prev, ...newFileNames]);
		return;
	};

	const handleRemoveImage = (index: number) => {
		// 선택된 이미지 및 파일 이름에서 해당 인덱스의 항목을 삭제
		setReportImage((prevImages) => prevImages.filter((_, i) => i !== index));
		setSelectedFileNames((prevFileNames) => prevFileNames.filter((_, i) => i !== index));
	  };

	/** 통신로직 */
	const postReportMutation = useMutation(postReportUser, {
	 	onSuccess: (response) => {
	 		alert("신고가 접수되었습니다.");
	 		router.back();
	 	},
	 	onError: () => {
	 		alert("오류가 발생하였습니다");
	 	},
	 });

	 // 신고하기 버튼 눌렀을때 함수
	const handleReportPost = () => {
		const userId = String(router.query.id);

	 	if (!selectedReason || !reportDetail || reportImage.length === 0) {
	 		alert("모든 필수 항목을 입력해주세요.");
	 		return;
	 	}

	 	const formdata = new FormData();

		// 1. 이미지를 FormData로 형변환, 자바가 인식할수 있도록 요건 type을 지정할 필요가 없는 이윤 자바에서 다 하나하나 뭐시기하기떄문?
	 	reportImage.map((img) => {
	 		formdata.append("file", img);
	 	});

	 	// blob | string  객체는 해당하지 않아서string 으로 바꿔주는것
	 	// 2. 이미지 외 게시물 등록 정보
	 	formdata.append("data", new Blob([JSON.stringify(reportData)], { type: "application/json" }));
	 	postReportMutation.mutate({userId, formdata});
	 };

	return (
		<div className="flex flex-col content-center items-center h-full">
			<h1 className="text-3xl m-[60px] font-bold">신고사유</h1>
			<div className="w-[420px] flex flex-wrap mb-4 ml-7 sm:w-[500px]">
				{Object.entries(reasons).map(([key, value], index) => (
					<div className="sm:w-[250px] h-[50px] w-[210px]" key={index}>
						<input type="radio" name="reason" id={`content${index}`} onClick={() => handleReasonChange(value)} className="cursor-pointer mr-5"/>
						<label htmlFor={`content${index}`} className="cursor-pointer text-lg">{key}</label>
					</div>
				))}
			</div>
			<div>
				<textarea className="pl-4 pt-4 border reszie-none border-gray rounded-2xl sm:w-[500px] w-[380px] sm:ml-0 ml-1 h-60" value={reportDetail}
							onChange={handleReportDetailChange}
					placeholder="구체적인 신고 사유를 입력해주세요." maxLength={1500}/>
			</div>
			<div className="sm:w-[500px] w-[380px]">
				<h2 className="pr-[200px] text-lg mt-5 mb-5 font-bold sm:pr-[420px]">신고사진</h2>
				<input type="file" id="file" multiple accept=".jpg, .jpeg, .png" className="hidden" onChange={handleImageChange}/>
			{ reportImage.length ? (
			<>
			{reportImage.map((file, i) => (
				<div key={i}
				className="flex justify-center border border-gray rounded-2xl sm:w-[500px] w-[380px] h-40 pt-5 pl-5">
				<img src={URL.createObjectURL(file)} alt="미리보기" className="w-[200px] h-[90%] object-cover"/>
				<button className="w-5 h-5 border border-gray mr-5 rounded-sm text-lg flex items-center justify-center" onClick={() => handleRemoveImage(i)}>x</button>
				</div>
			))}
			</>
			) : (
					<>
					<label htmlFor="file"
					className="flex flex-col gap-3 justify-center items-center border border-gray rounded-2xl sm:w-[500px] w-[380px] h-36 cursor-pointer">
					<Image alt="사진업로드아이콘" width={45} height={45} src="/images/CameraIcon.png" />
					<span className="text-gray">사진 올리기</span>
					</label>
					</>
				)
			}
			</div>
			<div className="flex justify-center mb-[50px] mt-[100px] gap-10">
						<button onClick={handleCancel} className="font-bold border text-white h-14 rounded-2xl bg-[#D9D9D9] sm:w-[200px] w-[150px]">취소</button>
						<button className="font-bold bg-mainColor text-white h-14 rounded-2xl sm:w-[200px] w-[150px]" onClick={handleReportPost}>
							신고
						</button>
			</div>
			<div className="h-[65px]"></div>
		</div>
	)
}

export default UserReport;