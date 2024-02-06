import { useRouter } from "next/router";
import React from "react";

const InterestButton = () => {
    const router = useRouter();
    const { interest, ...updatedQuery } = router.query;

    const handleToggle = (selectedInterest: string | null) => {
        const newQuery = selectedInterest ? { ...updatedQuery, interest: selectedInterest } : updatedQuery;
        router.push(
            {
                pathname: router.pathname,
                query: newQuery,
            },
            undefined,
            { shallow: false }
        );
    };

    const toggleButton = (interestType: string, label: string) => (
        <button className={`${interest === interestType ? "bg-mainColor text-white" : "border"} flex-shrink-0 border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[95px] h-[35px] rounded-[20px]`} onClick={() => handleToggle(interest === interestType ? null : interestType)}>
            {label}
        </button>
    );

    return (
        <div className="flex overflow-x-auto whitespace-nowrap">
            {toggleButton("Eats", "🍰 맛집")}
            {toggleButton("Culture", "🎬 문화")}
            {toggleButton("Exercise", "🏀 운동")}
            {toggleButton("Study", "📖 스터디")}
            {toggleButton("Etc", "🎸 기타")}
        </div>
    );
};

export default InterestButton;
