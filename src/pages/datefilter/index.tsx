import Calendar from "@/components/calendar/Calendar";
import { getDateFormat } from "@/utils/getDate";
import { useRouter } from "next/router";
import React, { useState } from "react";

const dateFilter = () => {
    const router = useRouter();
    const [date, setDate] = useState<Date>(new Date());

    const handleDateChange = (date: Date) => {
        setDate(date);
    };
    return (
        <div className="grid place-items-center">
            <p className="text-[25px] mt-[100px] mb-[40px]">언제 만나고 싶으신가요?</p>
            <Calendar showTime={false} onDateChange={handleDateChange} />
            <button
                className="w-[370px] h-[60px] text-[25px] mt-[400px] border rounded-[20px]"
                onClick={() => router.push(`/main?date=${getDateFormat(date)}`)}
            >
                필터적용
            </button>
        </div>
    );
};

export default dateFilter;
