import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { StatisticsType } from "@/types/managerTypes";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatiscticsDoughnut = ({ statistics }: { statistics: StatisticsType }) => {
    const [doughnutChart, setDoughnutChart] = useState<number>(0);
    const { tenCnt = 0, twentyCnt = 0, thirtyCnt = 0, fortyCnt = 0, fiftyCnt = 0, sixtyCnt = 0, ageEtcCnt = 0, eatsCnt = 0, cultureCnt = 0, exerciseCnt = 0, studyCnt = 0, categoryEtcCnt = 0, maleCnt = 0, femaleCnt = 0 } = statistics || {};
    const categoryData = {
        labels: ["맛집", "문화생활", "운동", "스터디", "기타"],
        datasets: [
            {
                label: "# of Votes",
                data: [eatsCnt, cultureCnt, exerciseCnt, studyCnt, categoryEtcCnt],
                backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
                borderWidth: 1,
            },
        ],
    };
    const genderData = {
        labels: ["남성", "여성"],
        datasets: [
            {
                label: "# of Votes",
                data: [maleCnt, femaleCnt],
                backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
            },
        ],
    };
    const ageData = {
        labels: ["10대", "20대", "30대", "40대", "50대", "60대", "60대 이상"],
        datasets: [
            {
                label: "# of Votes",
                data: [tenCnt, twentyCnt, thirtyCnt, fortyCnt, fiftyCnt, sixtyCnt, ageEtcCnt],
                backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(128, 200, 50, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)", "rgba(128, 200, 50, 1)"],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "right" as const,
            },
        },
    };

    return (
        <div className="">
            <ul className="flex items-center w-[100%] justify-center space-x-[60px]">
                {["카테고리", "성별", "나이"].map((name, index) => {
                    return (
                        <li key={index} className="flex flex-col">
                            <button onClick={() => setDoughnutChart(index)} className={`text-[15px] ${index === doughnutChart ? "text-mainColor" : "text-managerFontColor"}`}>
                                {name}
                            </button>
                            {doughnutChart === index ? <div className="h-[5px] w-[50px] bg-mainColor"></div> : <></>}
                        </li>
                    );
                })}
            </ul>
            <Doughnut data={doughnutChart === 0 ? categoryData : doughnutChart === 1 ? genderData : ageData} options={options} />
        </div>
    );
};

export default StatiscticsDoughnut;
