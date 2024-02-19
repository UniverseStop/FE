import Category from "@/components/category/Category";
import AddContent from "@/components/create-post/AddContent";
import AddDateTime from "@/components/create-post/AddDateTime";
import AddImage from "@/components/create-post/AddImage";
import AddMeetingLimit from "@/components/create-post/AddMeetingLimit";
import AddPlace from "@/components/create-post/AddPlace";
import AddTitle from "@/components/create-post/AddTitle";
import { getDateTimeFormat } from "@/utils/getDate";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation} from "react-query";
import { postBusStop } from "../api/post";
import { ConfirmPermissions } from "@/utils/confirmPermissions";
import { myPlaceType } from "@/types/postTypes";

function CreatePost() {
    const [postCategory, setPostCategory] = useState<string>("");
    const [postImage, setPostImage] = useState<File[]>([]);
    const [postTitle, setPostTitle] = useState<string>("");
    const [postContent, setPostContent] = useState<string>("");
    const [postLoaction, setPostLoaction] = useState<myPlaceType>({
        lat: 0,
        lng: 0, // 위도 경도
        placeName: "", // 장소 설명
        address: "", // 장소 주소
    });
    const [postDateTime, setPostDateTime] = useState<Date>(new Date());
    const [postSubLimit, setpostSubLimit] = useState<number>(1);

	ConfirmPermissions(); // 로그인 후 이용가능한 페이지

    const router = useRouter();
    const handleCancel = () => {
        router.back();
    };

    const handleCategoryChange = (category: string) => {
        setPostCategory(category);
    };

    const postData = {
        category: postCategory,
        title: postTitle,
        content: postContent,
        lat: postLoaction.lat,
        lng: postLoaction.lng, // 위도 경도
        placeName: postLoaction.placeName, // 장소 설명
        location: postLoaction.address, // 상세 주소
        endDate: getDateTimeFormat(postDateTime),
        subLimit: postSubLimit,
    };

    /** 통신로직 */
    const postAddMutation = useMutation(postBusStop, {
        onSuccess: (response) => {
            alert("게시글이 등록되었습니다.");
            router.push("/main");
        },
        onError: () => {
            alert("오류가 발생하였습니다");
        },
    });

    // 등록하기 버튼 눌렀을때 함수
    const handleAddPost = () => {
        if (!postCategory || !postTitle || !postContent || !postLoaction || !postDateTime || !postSubLimit || postImage.length === 0) {
            alert("모든 필수 항목을 입력해주세요.");
            return;
        }

        const formdata = new FormData();

        // 1. 이미지를 FormData로 형변환, 자바가 인식할수 있도록 요건 type을 지정할 필요가 없는 이윤 자바에서 다 하나하나 뭐시기하기떄문?
        postImage.map((img) => {
            formdata.append("file", img);
        });

        // blob | string  객체는 해당하지 않아서string 으로 바꿔주는것
        // 2. 이미지 외 게시물 등록 정보
        formdata.append("data", new Blob([JSON.stringify(postData)], { type: "application/json" }));
        postAddMutation.mutate(formdata);
    };

    return (
        <div className="w-[550px] sm:pr-0 pr-5">
            <div>
                <Category title="🗂️ 카테고리" handleCategoryChange={handleCategoryChange} />
                <AddImage postImage={postImage} setPostImage={setPostImage} />
                <AddTitle postTitle={postTitle} setPostTitle={setPostTitle} />
                <AddContent postContent={postContent} setPostContent={setPostContent} />
                <AddMeetingLimit postSubLimit={postSubLimit} setpostSubLimit={setpostSubLimit} />
                <AddDateTime postDateTime={postDateTime} setPostDateTime={setPostDateTime} />
                <AddPlace postLoaction={postLoaction} setPostLoaction={setPostLoaction} />
            </div>
            <div className="w-[550px] flex justify-center mb-10 mt-[100px] gap-10">
                <button onClick={handleCancel} className="border text-mainColor border-mainColor h-14 rounded-2xl w-1/4">
                    취소
                </button>
                <button onClick={handleAddPost} className="bg-mainColor text-white h-14 rounded-2xl w-1/4">
                    등록하기
                </button>
            </div>
        </div>
    );
}

export default CreatePost;
