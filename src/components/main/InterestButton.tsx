import { useRouter } from "next/router";
import React from "react";

const InterestButton = () => {
    const router = useRouter();
    const updatedQuery = { ...router.query };
    const { interest } = updatedQuery;
    const handleInterestChange = (selectedInterest: string) => {
        updatedQuery.interest = selectedInterest;
        router.push(
            {
                pathname: router.pathname,
                query: updatedQuery,
            },
            undefined,
            { shallow: false }
        );
    };

    return (
        <div className="w-full">
            <button
                className={`${interest == "Eats" ? "bg-mainColor text-white" : "border"} border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[95px] h-[35px] rounded-[20px]`}
                onClick={() => handleInterestChange("Eats")}
            >
                🍰 맛집
            </button>
            <button
                className={`${interest == "Culture" ? "bg-mainColor text-white" : "border"} border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[95px] h-[35px] rounded-[20px]`}
                onClick={() => handleInterestChange("Culture")}
            >
                🎬 문화
            </button>
            <button
                className={`${interest == "Exercise" ? "bg-mainColor text-white" : "border"} border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[95px] h-[35px] rounded-[20px]`}
                onClick={() => handleInterestChange("Exercise")}
            >
                🏀 운동
            </button>
            <button
                className={`${interest == "Study" ? "bg-mainColor text-white" : "border"} border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[95px] h-[35px] rounded-[20px]`}
                onClick={() => handleInterestChange("Study")}
            >
                📖 스터디
            </button>
            <button
                className={`${interest == "Etc" ? "bg-mainColor text-white" : "border"} border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[95px] h-[35px] rounded-[20px]`}
                onClick={() => handleInterestChange("Etc")}
            >
                🎸 기타
            </button>
        </div>
    );
};

export default InterestButton;
