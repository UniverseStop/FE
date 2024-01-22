import { getPostLocationStatic } from "@/pages/api/manager";
import { useQuery } from "react-query";

const Statistics = () => {
    const { data: PostLocation } = useQuery("PostLocation", getPostLocationStatic);

    return (
        <div className="flex items-center justify-center pt-10">
            <div className="flex justify-center p-5 space-x-10 w-[1300px] h-[600px]">
                <section className="bg-white w-[460px] h-[480px] p-[20px]">
                    <div>
                        <span>afas</span>
                    </div>
                </section>
                <section className="bg-white w-[800px] h-[480px] p-[20px]">
                    <div>
                        <span>afas</span>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Statistics;
