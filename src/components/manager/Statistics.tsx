import { getStatic } from "@/pages/api/manager";
import { useQuery } from "react-query";
import DoughnutChart from "./common/DoughnutChart";
import LineChart from "./common/LineChart";
import StatisticsMap from "./common/StatisticsMap";

const Statistics = () => {
    const { data: statistics } = useQuery("statistics", getStatic);

    return (
        <div>
            <div className="flex items-center justify-center pt-10">
                <div className="flex justify-center space-x-10 w-[1300px] h-[515px]">
                    <section className="bg-white w-[460px] h-[480px] p-[20px]">
                        <DoughnutChart statistics={statistics} />
                    </section>
                    <section className="bg-white w-[800px] h-[480px] p-[20px]">
                        <LineChart statistics={statistics} />
                    </section>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <section className="bg-white w-[1300px] h-[600px] mb-10">
                    <StatisticsMap />
                </section>
            </div>
        </div>
    );
};

export default Statistics;
