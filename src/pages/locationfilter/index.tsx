import Locationpicker from "@/components/locationpicker/Locationpicker";
import React from "react";

const locationFilter = () => {
    return (
        <div className="grid place-items-center">
            <p className="text-[25px] mt-[100px] mb-[50px]">
                어디서 만나고 싶으신가요?
            </p>
            <Locationpicker />
        </div>
    );
};

export default locationFilter;
