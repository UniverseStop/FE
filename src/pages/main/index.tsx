import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getBusStopMainItems } from "../api/post";
import { PostPreviewType } from "@/types/postTypes";
import PostDetail from "@/components/post/PostDetail";
import { getDateFormat } from "@/utils/getDate";
import Image from "next/image";
import Search from "@/components/main/Search";
import DateFilter from "@/components/main/DateFilter";
import LocationFilter from "@/components/main/LocationFilter";
import InterestButton from "@/components/main/InterestButton";
import Nav from "@/components/nav/Nav";

const mainPage = () => {
    const router = useRouter();

    const [componentToggle, setComponentToggle] = useState<string>("");
    const [page, setPage] = useState<number>(0);
    const [search, setSearch] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [interest, setInterest] = useState<string>("");
    const [queryString, setQueryString] = useState("");
    const [postData, setPostData] = useState<PostPreviewType[]>([]);
    const [infiniteToggle, setInfiniteToggle] = useState<boolean>(true);

    useEffect(() => {
        const queryParams = [];
        if (search) queryParams.push(`titleOrContent=${search}`);
        if (date) queryParams.push(`endDate=${date}`);
        if (location) queryParams.push(`location=${location}`);
        if (interest) queryParams.push(`interest=${interest}`);

        const newQueryString = queryParams.length > 0 ? "&" + queryParams.join("&") : "";
        setQueryString(newQueryString);
        setPostData([]);
        setPage(0);
        setInfiniteToggle(true);
    }, [search, date, location, interest]);

    const { data, isLoading, isError } = useQuery(
        ["postList", { page, queryString }],
        () => getBusStopMainItems(page, queryString),
        {
            onSuccess: (newData) => {
                newData.pop();
                setPostData((data) => (data ? [...data, ...newData] : newData));
                if (newData.length === 0) {
                    setInfiniteToggle(false);
                }
            },
        }
    );

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
    const handleSearchChange = (search: string) => {
        setSearch(search);
        setComponentToggle("");
    };
    const handleDateChange = (date: Date) => {
        setDate(getDateFormat(date));
    };
    const handleLocationChange = (location: string) => {
        setLocation(location);
        setComponentToggle("");
    };
    const handleInterestChange = (interest: string) => {
        setInterest(interest);
    };
    const handleSearchCancel = () => {
        setSearch("");
        setDate("");
        setLocation("");
        setInterest("");
    };

    if (componentToggle == "search") {
        return <Search onSearchChange={handleSearchChange} />;
    }
    if (componentToggle == "date") {
        return <DateFilter onDateToggle={handleComponentToggle} onDateChange={handleDateChange} />;
    }
    if (componentToggle == "location") {
        return <LocationFilter onLocationChange={handleLocationChange} />;
    }

    return (
        <div className="h-screen border">
            <div className="flex flex-row border">
                {search ? (
                    <div className="flex items-center mr-auto mt-[30px]">
                        <span className="mr-[10px] text-4xl text-black">{search}</span>
                        <Image
                            alt="cancel_icon"
                            width={20}
                            height={20}
                            className="cursor-pointer"
                            src="/images/cancel.png"
                            onClick={handleSearchCancel}
                        />
                    </div>
                ) : (
                    <img
                        className="mr-auto mt-[30px] ml-[30px] cursor-pointer"
                        src="https://i.ibb.co/LY7XF2w/Group-172.png"
                        alt="로고"
                        onClick={() => router.push("/")}
                    ></img>
                )}
                <img
                    className="h-[47px] mt-[33px] mr-[30px] cursor-pointer"
                    src="https://github.com/tph7897/tph7897/assets/132332533/7a3eed66-2a45-40c4-ad0c-ee1c671601fc"
                    alt="검색버튼"
                    onClick={() => setComponentToggle("search")}
                ></img>
            </div>
            <div className="border border-t border-mainDivisionLine my-[20px] "></div>
            <div className="w-full">
                <button
                    className="border border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[155px] h-[35px] rounded-[20px]"
                    onClick={() => setComponentToggle("date")}
                >
                    {date ? date : "날짜"}
                </button>
                <button
                    className="border border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[155px] h-[35px] rounded-[20px]"
                    onClick={() => setComponentToggle("location")}
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
            <Nav />
        </div>
    );
};

export default mainPage;
