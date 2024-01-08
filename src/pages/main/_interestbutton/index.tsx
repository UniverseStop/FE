import React, { useState } from "react";

const InterestButton = ({ onInterestChange }: { onInterestChange: (interest: string) => void }) => {
    const [interest, setInterest] = useState<string>("");

    const handleInterestChange = (interest: string) => {
        setInterest(interest);
        onInterestChange(interest);
    };
    return (
        <div className="w-full">
            <button
                className={`${
                    interest == "Eats" ? "bg-mainColor" : "border"
                } border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[95px] h-[35px] rounded-[20px]`}
                onClick={() => handleInterestChange("Eats")}
            >
                🍰 맛집
            </button>
            <button
                className={`${
                    interest == "Culture" ? "bg-mainColor" : "border"
                } border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[95px] h-[35px] rounded-[20px]`}
                onClick={() => handleInterestChange("Culture")}
            >
                🎬 문화
            </button>
            <button
                className={`${
                    interest == "Exercise" ? "bg-mainColor" : "border"
                } border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[95px] h-[35px] rounded-[20px]`}
                onClick={() => handleInterestChange("Exercise")}
            >
                🏀 운동
            </button>
            <button
                className={`${
                    interest == "Study" ? "bg-mainColor" : "border"
                } border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[95px] h-[35px] rounded-[20px]`}
                onClick={() => handleInterestChange("Study")}
            >
                📖 스터디
            </button>
            <button
                className={`${
                    interest == "Etc" ? "bg-mainColor" : "border"
                } border-mainColor mb-[20px] mr-[5px] ml-[15px] w-[95px] h-[35px] rounded-[20px]`}
                onClick={() => handleInterestChange("Etc")}
            >
                🎸 기타
            </button>
        </div>
    );
};

export default InterestButton;
