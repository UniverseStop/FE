import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getBusStopMainItems } from "../api/post";
import { PostPreviewType } from "@/types/postTypes";
import Image from "next/image";
import DateFilter from "@/components/main/DateFilter";
import LocationFilter from "@/components/main/LocationFilter";
import InterestButton from "@/components/main/InterestButton";
import PostPreview from "@/components/common/PostPreview";

interface QueryParams {
    search?: string;
    endDate?: string;
    location?: string;
    interest?: string;
}

const MainPage = () => {
    const queryParams = (data: QueryParams): string => {
        const { search, endDate, location, interest } = data;
        const arr = [];
        if (search) arr.push(`titleOrContent=${search}`);
        if (endDate) arr.push(`endDate=${endDate}`);
        if (location) arr.push(`location=${location}`);
        if (interest) arr.push(`interest=${interest}`);
        const newQueryString = arr.length > 0 ? "&" + arr.join("&") : "";
        return newQueryString;
    };
    const router = useRouter();
    const updatedQuery = { ...router.query };
    const { search, endDate, location } = updatedQuery;
    const [componentToggle, setComponentToggle] = useState<string>("");
    const [page, setPage] = useState<number>(0);
    const [postData, setPostData] = useState<PostPreviewType[]>([]);
    const [infiniteToggle, setInfiniteToggle] = useState<boolean>(true);

    useEffect(() => {
        setPostData([]);
        setPage(0);
        setInfiniteToggle(true);
    }, []);

    const { isLoading } = useQuery(["postList", { page }], () => getBusStopMainItems(page, queryParams(updatedQuery)), {
        onSuccess: (newData) => {
            setPostData((data) => (data ? [...data, ...newData] : newData));
            if (newData.length === 0) {
                setInfiniteToggle(false);
            }
        },
    });

    const observer = useRef<IntersectionObserver | null>(null);
    const lastPostRef = useCallback(
        (node: HTMLButtonElement | null) => {
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

    const handleComponentToggle = () => {
        setComponentToggle("");
    };

    if (componentToggle == "date") {
        return <DateFilter onDateToggle={handleComponentToggle} />;
    }
    if (componentToggle == "location") {
        return <LocationFilter onLocationToggle={handleComponentToggle} />;
    }

    return (
        <div>
            <div className="flex flex-row">
                {search ? (
                    <div className="flex items-center mr-auto mt-[30px] ml-[30px]">
                        <span className="mr-[10px] text-4xl text-black">{search}</span>
                        <Image alt="cancel_icon" width={20} height={20} className="cursor-pointer" src="/images/cancel.png" onClick={() => router.push(`/main`)} />
                    </div>
                ) : (
                    <img className="h-[50px] mr-auto mt-[30px] ml-[30px] cursor-pointer" src="/images/unibus_logo.png" alt="로고" onClick={() => router.push("/")}></img>
                )}
                <img className="h-[47px] mt-[33px] mr-[30px] cursor-pointer" src="/images/search.png" alt="검색버튼" onClick={() => router.push(`/search`)}></img>
            </div>
            <div className="border border-t border-mainDivisionLine my-[20px] "></div>
            <div className="w-full">
                <button className="border border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[155px] h-[35px] rounded-[20px]" onClick={() => setComponentToggle("date")}>
                    {endDate ? endDate : "날짜"}
                </button>
                <button className="border border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[155px] h-[35px] rounded-[20px]" onClick={() => setComponentToggle("location")}>
                    {location ? location : "위치"}
                </button>
            </div>
            <InterestButton />
            {postData.length > 0 ? (
                <div className="flex flex-wrap">
                    {postData.map((p: PostPreviewType, index: number) => {
                        if (index === postData.length - 1) {
                            return (
                                <button className="w-[46%] sm:w-[30%] min-w-[145px] aspect-square box-border m-[1.66%]" key={p.id} ref={lastPostRef} onClick={() => router.push(`/detail/${p.id}`)}>
                                    <PostPreview info={p} type={""} />
                                </button>
                            );
                        } else {
                            return (
                                <button className="w-[46%] sm:w-[30%] min-w-[145px] aspect-square box-border m-[1.66%]" key={p.id} onClick={() => router.push(`/detail/${p.id}`)}>
                                    <PostPreview info={p} type={""} />
                                </button>
                            );
                        }
                    })}
                </div>
            ) : (
                <div className="flex justify-center items-center">
                    <img className="w-[46%] sm:w-[30%] min-w-[145px]" src="/images/no_post.png" alt="아직 게시글이 없습니다"></img>
                </div>
            )}
            <div className="h-[50px]" />
        </div>
    );
};

export default MainPage;
