import Locationpicker from "@/components/locationpicker/Locationpicker";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const LocationFilter = ({ onLocationToggle }: { onLocationToggle: () => void }) => {
    const router = useRouter();
    const updatedQuery = { ...router.query };

    const handleLocationChange = (selectedLocation: string) => {
        if (selectedLocation) {
            updatedQuery.location = selectedLocation;
        } else {
            delete updatedQuery.location;
        }
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
            <button className="z-[100] fixed top-10 pl-5" onClick={onLocationToggle}>
                <Image alt="back_icon" width={20} height={20} src="/images/back.svg" />
            </button>
            <div className="grid place-items-center">
                <p className="text-[25px] mt-[100px] mb-[15px]">어디서 만나고 싶으신가요?</p>
                <div className="text-right mb-[15px] w-[370px]">
                    <button className="text-red text-[15px]" onClick={() => handleLocationChange("")}>
                        ↩︎초기화
                    </button>
                </div>
                <Locationpicker showInline={true} onLocationChange={handleLocationChange} />
            </div>
        </div>
    );
};

export default LocationFilter;
