import Image from "next/image";
import React from "react";

const Spinner = () => {
    return (
        <div className="flex h-screen bg-white">
            <section className="m-auto flex flex-col items-center">
                <div className="relative top-[30px]">
                    <Image
                        alt="earth"
                        width={285}
                        height={300}
                        src="/images/single-earth.png"
                        className="animate-spin-slow wiggle"
                    />
                    <Image
                        alt="bus"
                        width={185}
                        height={200}
                        src="/images/bus.png"
                        className="absolute top-[-30px] left-[45px]"
                    />
                </div>
            </section>
        </div>
    );
};

export default Spinner;
