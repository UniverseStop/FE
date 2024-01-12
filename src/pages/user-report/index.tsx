import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from 'react'

const UserReport = () => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [reportDetail, setReportDetail] = useState<string>("")
  const router = useRouter();

  const handleCancel = () => {
      router.back();
  };
  const reasons = {"성적인 콘텐츠": "SEXUAL_CONTENT", "폭력적 또는 괴롭힘": "BULLYING", "잘못된 정보": "MISINFORMATION", "스팸 또는 광고성 콘텐츠": "SPAM", "기타": "OTHER",
    };

  const handleReasonChange = (reason: string) => {
    setSelectedReason(reason);
  };

	const reportData = {
		report: selectedReason,
		reportDetail : reportDetail
	};

	// /** 통신로직 */
	// const postAddMutation = useMutation(postBusStop, {
	// 	onSuccess: (response) => {
	// 		alert("게시글이 등록되었습니다.");
	// 		router.push("/main");
	// 	},
	// 	onError: () => {
	// 		alert("오류가 발생하였습니다");
	// 	},
	// });

	// // 등록하기 버튼 눌렀을때 함수
	// const handleAddPost = () => {
	// 	if (!postCategory || !postTitle || !postContent || !postLoaction || !postDateTime || !postSubLimit || postImage.length === 0) {
	// 		alert("모든 필수 항목을 입력해주세요.");
	// 		return;
	// 	}

	// 	const formdata = new FormData();

	// 	// 1. 이미지를 FormData로 형변환, 자바가 인식할수 있도록 요건 type을 지정할 필요가 없는 이윤 자바에서 다 하나하나 뭐시기하기떄문?
	// 	postImage.map((img) => {
	// 		formdata.append("file", img);
	// 	});

	// 	// blob | string  객체는 해당하지 않아서string 으로 바꿔주는것
	// 	// 2. 이미지 외 게시물 등록 정보
	// 	formdata.append("data", new Blob([JSON.stringify(postData)], { type: "application/json" }));
	// 	postAddMutation.mutate(formdata);
	// };

  return (
    <div className="flex flex-col content-center items-center h-full">
      <h1 className="text-3xl m-[60px] font-bold">신고사유</h1>
      <section className="w-[500px] flex flex-wrap mb-4 ml-7">
          {Object.entries(reasons).map(([key, value], index) => (
             <div className="w-[250px] h-[50px]" key={index}>
                  <input type="radio" name="reason" id={`content${index}`} onClick={() => handleReasonChange(value)} className="cursor-pointer mr-5"/>
                  <label htmlFor={`content${index}`} className="cursor-pointer text-lg">{key}</label>
             </div>
           ))}
      </section>
      <section>
          <textarea className="pl-4 pt-4 border reszie-none border-gray rounded-2xl w-[500px] h-60"
        	placeholder="구체적인 신고 사유를 입력해주세요." maxLength={1500}/>
      </section>
      <section>
           <h2 className=" pr-[420px] text-lg mt-5 mb-5 font-bold">신고사진</h2>
           <label htmlFor="file"
			    		className="flex flex-col gap-3 justify-center items-center border border-gray rounded-2xl w-[500px] h-36 cursor-pointer">
					  <Image alt="사진업로드아이콘" width={45} height={45} src="/images/CameraIcon.png" />
            <span className="text-gray">사진 올리기</span>
				   </label>
      </section>
      <section className="flex justify-center mb-[50px] mt-[100px] gap-10">
				<button onClick={handleCancel} className="font-bold border text-white h-14 rounded-2xl bg-[#D9D9D9] w-[200px]">취소</button>
				<button className="font-bold bg-mainColor text-white h-14 rounded-2xl w-[200px]">
            신고
				</button>
			</section>
    </div>
  )
}

export default UserReport

