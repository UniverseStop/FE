import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./calendar.module.css";
import { ko } from "date-fns/locale";
import styled from "styled-components";

const Calendar = ({ showTime, onDateChange }: { showTime: boolean; onDateChange: (date: Date) => void }) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const handleDateChange = (date: Date | null) => {
        setStartDate(date);
        if (date) {
            onDateChange(date);
        }
    };

    return (
        <div>
            <DatePicker
                locale={ko}
                className={showTime? styles.datePickerPost : styles.datePickerFliter}
                calendarClassName={styles.calenderWrapper}
                dayClassName={(d) => (d.getDate() === startDate!.getDate() ? styles.selectedDay : styles.unselectedDay)}
                shouldCloseOnSelect={true} // 날짜를 선택하면 datepicker가 자동으로 닫힘
                dateFormat={showTime ? "yyyy.MM.dd eee hh:mm" : "yyyy.MM.dd eee"} // 날짜 형태
                minDate={new Date()} // minDate 이전 날짜 선택 불가
                selected={startDate}
                onChange={(date) => handleDateChange(date)}
                showTimeSelect={showTime}
            />
        </div>
    );
};

export default Calendar;
