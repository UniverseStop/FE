import Back from "@/components/common/Back";
import useInput from "@/hooks/useInput";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Search = () => {
    const [searchValue, handleSearchChange, resetSearchValue] = useInput("");
    const router = useRouter();
    // 엔터 검색
    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter"){
            resetSearchValue; 
            router.push(`/main?search=${searchValue}`);
        }
    };


    // 추천 검색어 (선택된 추천 검색어로만 검색)
    const handleClickRecommend = (val: string) => {
        router.push(`/main?search=${val}`);
        resetSearchValue; // 검색어 초기화
    };

    return (
        <div className="flex flex-col text-center pt-28 h-screen">
            <Back isBlack={true}/>
            <section>
                <span className="flex pl-14 font-bold text-2xl">무엇을 찾으시나요?</span>
                <div className="relative right-4">
                    <input
                        className="text-xl pb-2 focus:outline-none border-b-2 w-9/12 pt-9 pl-4 pr-16"
                        placeholder="검색어를 입력해주세요."
                        value={searchValue}
                        onChange={handleSearchChange}
                        onKeyDown={handleEnter}
                    />
                    <button className="absolute top-7 right-4 px-2 py-1 pr-14" onClick={() => router.push(`/main?search=${searchValue}`)}>
                        <Image alt="search_icon" width={30} height={30} src="/images/search.png" />
                    </button>
                </div>
            </section>
            <section className="pt-28 flex flex-col items-center text-left">
                <span className="w-full flex pl-14 font-bold text-2xl">추천 검색어</span>
                <div className="flex justify-start items-start w-10/12">
                    <ul className="w-[375px] flex flex-wrap">
                        {["산책", "맛집", "독서", "공방", "취미", "운동"].map((item, index) => {
                            return (
                                <button
                                    className="text-mainColor flex items-center justify-center m-2 border rounded-2xl w-[98px] h-[35px] text-xl"
                                    key={index}
                                    value={item}
                                    onClick={() => handleClickRecommend(item)}
                                >
                                    #{item}
                                </button>
                            );
                        })}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default Search;