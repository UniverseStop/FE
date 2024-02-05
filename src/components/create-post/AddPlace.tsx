import { myPlaceType } from "@/types/postTypes";
import React, { useState } from "react";
import AddLocation from "./AddLocation";

function AddPlace({ postLoaction, setPostLoaction }: { postLoaction: myPlaceType; setPostLoaction: (postPlace: myPlaceType) => void }) {
    const [isShowLocationModal, setIsShowLocationModal] = useState<boolean>(false);

    const handleClick = () => {
        setIsShowLocationModal((prev) => !prev);
    };

    return (
        <div>
            <p className="text-2xl font-bold m-6 0 6 6">📍 장소</p>
            <section className="flex flex-col items-center gap-4 ">
                <button onClick={handleClick} className="flex justify-start border border-mainColor rounded-2xl sm:w-[525px] w-[520px] h-14 sm:ml-5 ml-7">
                    {!postLoaction.placeName ? <span className="text-gray p-4 0 0 6">장소를 입력해주세요</span> : <span className="text-gray p-4 0 0 6">{postLoaction.placeName}</span>}
                </button>
                {isShowLocationModal && (
                    <section className="w-[95%] ml-5">
                        <AddLocation setPostLoaction={setPostLoaction} />
                    </section>
                )}
            </section>
        </div>
    );
}
export default AddPlace;
