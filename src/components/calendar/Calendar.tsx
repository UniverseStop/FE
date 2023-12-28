import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./calendar.module.css";
import { ko } from "date-fns/locale";

const Calendar = ({ showTime }: { showTime: boolean }) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());

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
                dateFormat="yyyy.MM.dd eee" // 날짜 형태
                minDate={new Date()} // minDate 이전 날짜 선택 불가
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect={showTime}
            />
            {/* <button></button> */}
        </div>
    );
};

export default Calendar;
