import React, { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getBusStopMainItems } from "../api/post";
import { PostPreviewType } from "@/types/postTypes";
import PostDetail from "@/components/post/PostDetail";
import { useParams, usePathname, useSearchParams } from "next/navigation";

const mainPage = () => {
    const router = useRouter();
    const { search, interest, date, location } = router.query;

    const [page, setPage] = useState<number>(0);
    const [postData, setPostData] = useState<PostPreviewType[]>([]);
    const [infiniteToggle, setInfiniteToggle] = useState<boolean>(true);

    const { data, isLoading, isError } = useQuery(["postList", page], () => getBusStopMainItems(page), {
        onSuccess: (newData) => {
            newData.pop();
            setPostData((data) => (data ? [...data, ...newData] : newData));
            if (newData.length === 0) {
                setInfiniteToggle(false);
            }
        },
    });

    const observer = useRef<IntersectionObserver | null>(null);
    const lastPostRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (!infiniteToggle || isLoading || !node) return;

            if (observer.current) {
                observer.current.disconnect();
            }

            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        setPage((prevPage) => prevPage + 1);
                    }
                },
                { threshold: 0.8 }
            );
            observer.current.observe(node);
        },
        [isLoading]
    );

    return (
        <>
            <div className="flex flex-row">
                <img
                    className="mr-auto mt-[30px] ml-[30px]"
                    src="https://i.ibb.co/LY7XF2w/Group-172.png"
                    alt="로고"
                ></img>
                <img
                    className="h-[47px] mt-[33px] mr-[30px]"
                    src="https://github.com/tph7897/tph7897/assets/132332533/7a3eed66-2a45-40c4-ad0c-ee1c671601fc"
                    alt="검색버튼"
                    onClick={() => router.push("/search")}
                ></img>
            </div>
            <div className="border border-t border-mainDivisionLine my-[20px] "></div>
            <div className="w-full">
                <button className="border border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[155px] h-[35px] rounded-[20px]">
                    {date ? date : "날짜"}
                </button>
                <button className="border border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[155px] h-[35px] rounded-[20px]">
                    지역
                </button>
            </div>
            <div className="w-full">
                <button className="border border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[95px] h-[35px] rounded-[20px]">
                    🍰 맛집
                </button>
                <button className="border border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[95px] h-[35px] rounded-[20px]">
                    🎬 문화
                </button>
                <button className="border border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[95px] h-[35px] rounded-[20px]">
                    🏀 운동
                </button>
                <button className="border border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[95px] h-[35px] rounded-[20px]">
                    📖 스터디
                </button>
                <button className="border border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[95px] h-[35px] rounded-[20px]">
                    🎸 기타
                </button>
            </div>
            <div className="flex flex-wrap">
                {postData &&
                    postData.map((p: PostPreviewType, index: number) => {
                        if (index === postData.length - 1) {
                            return (
                                <div
                                    className="w-[46%] sm:w-[30%] min-w-[145px] aspect-square box-border m-[1.66%]"
                                    key={p.id}
                                    ref={lastPostRef} // 마지막 아이템에 ref 추가
                                >
                                    <PostDetail info={p} wSize="w-[100%]" hSize="h-[100%]" />
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    className="w-[46%] sm:w-[30%] min-w-[145px] aspect-square box-border m-[1.66%]"
                                    key={p.id}
                                >
                                    <PostDetail info={p} wSize="w-[100%]" hSize="h-[100%]" />
                                </div>
                            );
                        }
                    })}
            </div>
        </>
    );
};

export default mainPage;
