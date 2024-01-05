import Image from "next/image";
import React from "react";

const Spinner = () => {
    return (
        // <div className="gradation w-full">
        // <div className="gradationh-screen bg-cover bg-[url('/images/loading-error-background.png')]">
        <div className="flex h-screen">
            <section className="m-auto flex flex-col items-center">
                <div className="relative top-[30px] z-9999">
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
            {/* </div> */}
        </div>
        // </div>
    );
};

export default Spinner;
