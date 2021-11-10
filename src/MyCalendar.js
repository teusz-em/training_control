import React from "react";
import Calendar from "react-calendar";


const MyCalendar = ({onChange, value}) => {
    const tileContent = ({view }) =>
        view === "month"

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