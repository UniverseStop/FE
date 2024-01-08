import React, { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getBusStopMainItems } from "../api/post";
import { PostPreviewType } from "@/types/postTypes";
import PostDetail from "@/components/post/PostDetail";
import { useParams } from "next/navigation";
import DateFilter from "./_datefilter";
import LocationFilter from "./_locationfilter";
import { getDateFormat } from "@/utils/getDate";
import InterestButton from "./_interestbutton";

const mainPage = () => {
    const router = useRouter();
    const params = useParams();

    const [dateFilterToggle, setDateFilterToggle] = useState<boolean>(false);
    const [locationFilterToggle, setLocationFilterToggle] = useState<boolean>(false);
    const [date, setDate] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [interest, setInterest] = useState<string>("");

    const handleLocationChange = (location: string) => {
        setLocation(location);
        setLocationFilterToggle(false);
    };
    const handleDateChange = (date: Date) => {
        setDate(getDateFormat(date));
    };
    const handleDateToggle = () => {
        setDateFilterToggle(false);
    };
    const handleInterestChange = (interest: string) => {
        setInterest(interest);
    };

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
    if (dateFilterToggle) {
        return <DateFilter onDateToggle={handleDateToggle} onDateChange={handleDateChange} />;
    }
    if (locationFilterToggle) {
        return <LocationFilter onLocationChange={handleLocationChange} />;
    }

    return (
        <>
            <div className="flex flex-row">
                <img
                    className="mr-auto mt-[30px] ml-[30px]"
                    src="https://i.ibb.co/LY7XF2w/Group-172.png"
                    alt="로고"
                    onClick={() => router.push("/")}
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
                <button
                    className="border border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[155px] h-[35px] rounded-[20px]"
                    onClick={() => setDateFilterToggle(true)}
                >
                    {date ? date : "날짜"}
                </button>
                <button
                    className="border border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[155px] h-[35px] rounded-[20px]"
                    onClick={() => setLocationFilterToggle(true)}
                >
                    {location ? location : "지역"}
                </button>
            </div>
            <InterestButton onInterestChange={handleInterestChange} />
            <div className="flex flex-wrap">
                {postData &&
                    postData.map((p: PostPreviewType, index: number) => {
                        if (index === postData.length - 1) {
                            return (
                                <button
                                    className="w-[46%] sm:w-[30%] min-w-[145px] aspect-square box-border m-[1.66%]"
                                    key={p.id}
                                    ref={lastPostRef}
                                    onClick={() => router.push(`/detail/${p.id}`)}
                                >
                                    <PostDetail info={p} wSize="w-[100%]" hSize="h-[100%]" />
                                </button>
                            );
                        } else {
                            return (
                                <button
                                    className="w-[46%] sm:w-[30%] min-w-[145px] aspect-square box-border m-[1.66%]"
                                    key={p.id}
                                    onClick={() => router.push(`/detail/${p.id}`)}
                                >
                                    <PostDetail info={p} wSize="w-[100%]" hSize="h-[100%]" />
                                </button>
                            );
                        }
                    })}
            </div>
        </>
    );
};

export default mainPage;
