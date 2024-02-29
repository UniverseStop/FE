import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { StatisticsType } from "@/types/managerTypes";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: "bottom" as const,
        },
        title: {
            display: true,
            text: "일일 방문자 수",
        },
    },
};

const StatiscticsLine = ({ statistics }: { statistics: StatisticsType }) => {
    let currentDate = new Date();
    let startDate = new Date();
    startDate.setDate(currentDate.getDate() - 29);
    let dateArray = [];
    while (startDate <= currentDate) {
        var dayOfMonth = ("0" + startDate.getDate()).slice(-2); // 일자를 두 자리 숫자로 포맷팅
        dateArray.push(dayOfMonth);
        startDate.setDate(startDate.getDate() + 1);
    }

    const { monthCnt = [], weekCnt = 0, allDayCnt = 0 } = statistics || {};

    const data = {
        labels: dateArray,
        datasets: [
            {
                label: "일간 방문수",
                data: monthCnt,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    return (
        <div>
            <ul className="flex w-[100%] space-x-[60px] h-15 p-[10px]">
                <li className="flex flex-col">
                    <span>일간 방문수</span>
                    <span className="m-auto">{monthCnt[monthCnt.length - 1]}</span>
                </li>
                <li className="flex flex-col">
                    <span>주간 방문수</span>
                    <span className="m-auto">{weekCnt}</span>
                </li>
                <li className="flex flex-col">
                    <span>누적 방문수</span>
                    <span className="m-auto">{allDayCnt}</span>
                </li>
            </ul>
            <Line options={options} data={data} />
        </div>
    );
};

export default StatiscticsLine;
