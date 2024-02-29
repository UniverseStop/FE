import Calendar from "@/components/calendar/Calendar";
import { filterState } from "@/recoil/atoms/filterState";
import { getDateFormat } from "@/utils/getDate";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

const DateFilter = ({ onDateToggle }: { onDateToggle: () => void }) => {
    const [date, setDate] = useState<string>("");
    const router = useRouter();
    const updatedQuery = { ...router.query };
    const handleDateChange = (date: Date) => {
        setDate(getDateFormat(date));
    };
    const handleDateToggle = () => {
        updatedQuery.endDate = date;
        router.push(
            {
                pathname: router.pathname,
                query: updatedQuery,
            },
            undefined,
            { shallow: false }
        );
    };

    const handleResetToggle = () => {
        delete updatedQuery.endDate;
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
        <div>
            <button className="z-[100] fixed top-10 pl-5" onClick={onDateToggle}>
                <Image alt="back_icon" width={20} height={20} src="/images/back.svg" />
            </button>
            <div className="grid place-items-center">
                <p className="text-[25px] mt-[100px] mb-[15px]">언제 만나고 싶으신가요?</p>
                <div className="text-right mb-[15px] w-[370px]">
                    <button className="text-red text-[15px]" onClick={handleResetToggle}>
                        ↩︎초기화
                    </button>
                </div>
                <Calendar showTime={false} onDateChange={handleDateChange} />
                <button className="text-mainColor border-mainColor w-[370px] h-[60px] text-[25px] mt-[400px] border rounded-[20px]" onClick={handleDateToggle}>
                    필터적용
                </button>
            </div>
        </div>
    );
};

export default DateFilter;
