import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./calendar.module.css";
import { ko } from "date-fns/locale";

const Calendar = ({ showTime }: { showTime: boolean }) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const handleDateChange = (date: Date | null) => {
        setStartDate(date);
        if (date) {
            console.log(formatDateWithDayOfWeek(date));
        }
    };

    function formatDateWithDayOfWeek(inputDate: Date): string {
        const originalDate = new Date(inputDate);

        const year = originalDate.getFullYear();
        const month = originalDate.getMonth() + 1;
        const day = originalDate.getDate();
        const hours = originalDate.getHours();
        const minutes = originalDate.getMinutes();
        const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][
            originalDate.getDay()
        ];

        const formattedDate = showTime
            ? `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(
                  2,
                  "0"
              )} ${dayOfWeek} ${String(hours).padStart(2, "0")}:${String(
                  minutes
              ).padStart(2, "0")}`
            : `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(
                  2,
                  "0"
              )} ${dayOfWeek}`;

        return formattedDate;
    }

    return (
        <div>
            <DatePicker
                locale={ko}
                className={styles.datePicker}
                calendarClassName={styles.calenderWrapper}
                dayClassName={(d) =>
                    d.getDate() === startDate!.getDate()
                        ? styles.selectedDay
                        : styles.unselectedDay
                }
                shouldCloseOnSelect={false} // 날짜를 선택하면 datepicker가 자동으로 닫힘
                dateFormat={
                    showTime ? "yyyy.MM.dd eee hh:mm" : "yyyy.MM.dd eee"
                } // 날짜 형태
                minDate={new Date()} // minDate 이전 날짜 선택 불가
                selected={startDate}
                onChange={(date) => handleDateChange(date)}
                showTimeSelect={showTime}
            />
            {/* <button></button> */}
        </div>
    );
};

export default Calendar;
