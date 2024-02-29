import { getStatic } from "@/pages/api/manager";
import { useQuery } from "react-query";
import StatiscticsDoughnut from "./common/StatiscticsDoughnut";
import StatiscticsLine from "./common/StatiscticsLine";
import StatisticsMap from "./common/StatisticsMap";

const Statistics = () => {
    const { data: statistics } = useQuery("statistics", getStatic);

    return (
        <div>
            <div className="flex items-center justify-center pt-10">
                <div className="flex justify-center space-x-10 w-[1300px] h-[515px]">
                    <div className="bg-white w-[460px] h-[480px] p-[20px]">
                        <StatiscticsDoughnut statistics={statistics} />
                    </div>
                    <div className="bg-white w-[800px] h-[480px] p-[20px]">
                        <StatiscticsLine statistics={statistics} />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="bg-white w-[1300px] h-[600px] mb-10">
                    <StatisticsMap />
                </div>
            </div>
        </div>
    );
};

export default Statistics;
