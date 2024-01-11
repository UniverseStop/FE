import useInput from "@/hooks/useInput";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";


const Search = () => {
    const [searchValue, handleSearchChange, resetSearchValue] = useInput("");
    const router = useRouter();

    // // 추천 검색어 (선택된 추천 검색어로만 검색)
    // const handleClickRecommend = (val: string) => {
    //     onSearchChange(val); // 선택된 추천 검색어로 업데이트
    //     resetSearchValue; // 검색어 초기화
    // };

    return (
        <div className="flex flex-col text-center pt-28 h-screen">
            {/* <section className="relative">
                <button className="absolute bottom-14 left-10">
                    <Image alt="back_icon" width={20} height={20} src="/images/back.svg" />
                </button>
            </section> */}
            <section>
                <span className="flex pl-16 font-bold text-2xl">무엇을 찾으시나요?</span>
                <div className="relative right-4">
                    <input
                        className="text-xl pb-2 focus:outline-none border-b-2 w-[475px] pt-9 pl-4"
                        placeholder="검색어를 입력해주세요."
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                    <button className="absolute top-2 right-4 px-2 py-1 pr-14" onClick={() => router.push(`/main?search=${searchValue}`)}>
                        <Image alt="search_icon" width={32} height={32} src="/images/search.png" />
                    </button>
                </div>
            </section>
            <section className="pt-28">
                <span className="flex pl-16 pb-7 font-bold text-2xl">추천 검색어</span>
                <div className="pl-14">
                    <ul className="flex flex-wrap justify-center items-center w-[350px]">
                        {["산책", "맛집", "독서", "공방", "취미", "운동"].map((item, index) => {
                            return (
                                <button
                                    className="text-mainColor flex items-center justify-center m-2 border rounded-2xl w-[98px] h-[35px] text-xl"
                                    key={index}
                                    value={item}
                                    // onClick={() => handleClickRecommend(item)}
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