import React, { useState } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";

const MyCalendar = () => {
    const [value, setValue] = useState(new Date());

    function onChange(nextValue) {
        setValue(nextValue);
    }

    const tileContent = ({ date, view }) =>
        view === "month"
    console.log(value.getMonth())

    return (
        <div className={"calendar_wrapper"}>
            <Calendar
                tileContent={tileContent}
                onChange={onChange}
                defaultView="month"
                value={value}
                prev2Label={null}
                next2Label={null}
            />
        </div>
    );
};

export default MyCalendar