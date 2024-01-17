import Calendar from "@/components/calendar/Calendar";
import { getDateFormat } from "@/utils/getDate";
import { useRouter } from "next/router";
import React, { useState } from "react";

const DateFilter = ({
    onDateToggle,
    onDateChange,
}: {
    onDateToggle: () => void;
    onDateChange: (date: string) => void;
}) => {
    const router = useRouter();
    const [date, setDate] = useState<Date>(new Date());

    const handleDateChange = (date: Date) => {
        setDate(date);
    };
    const handleDateToggle = () => {
        onDateChange(getDateFormat(date));
        onDateToggle();
    };

    const handleResetToggle = () => {
        onDateChange('');
        onDateToggle();
    };

    return (
        <div className="grid place-items-center">
            <p className="text-[25px] mt-[100px] mb-[15px]">언제 만나고 싶으신가요?</p>
            <div className="text-right mb-[15px] w-[370px]">
              <button className="text-red text-[15px]" onClick={handleResetToggle}>↩︎초기화</button>
            </div>
            <Calendar showTime={false} onDateChange={handleDateChange} />
            <button
                className="w-[370px] h-[60px] text-[25px] mt-[400px] border rounded-[20px]"
                onClick={handleDateToggle}
            >
                필터적용
            </button>
        </div>
    );
};

export default DateFilter;
