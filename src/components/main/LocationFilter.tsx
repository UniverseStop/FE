import Locationpicker from "@/components/locationpicker/Locationpicker";
import React, { useState } from "react";

const LocationFilter = ({ onLocationChange }: { onLocationChange: (location: string) => void }) => {
    return (
            <div className="grid place-items-center">
                <p className="text-[25px] mt-[100px] mb-[15px]">어디서 만나고 싶으신가요?</p>
                <div className="text-right mb-[15px] w-[370px]">
                    <button className="text-red text-[15px]" onClick={()=>onLocationChange('')}>↩︎초기화</button>
                </div>
                <Locationpicker showInline={true} onLocationChange={onLocationChange} />
            </div>
    );
};

export default LocationFilter;