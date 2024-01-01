import Calendar from "@/components/calendar/Calendar";
import React from "react";

const dateFilter = () => {
    
    return (
        <div className="grid place-items-center">
            <p className="text-[25px] mt-[100px] mb-[40px]">
                언제 만나고 싶으신가요?
            </p>
            <Calendar showTime={false} />
            <button className="w-[370px] h-[60px] text-[25px] mt-[400px] border rounded-[20px]">
                필터적용
            </button>
        </div>
    );
};

export default dateFilter;
