import React, {useEffect, useState} from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";
import {db} from "./firebase";

const MyCalendar = ({onChange, value}) => {
    // const [value, setValue] = useState(new Date());

    // function onChange(nextValue) {
    //     setValue(nextValue);
    // }

    const tileContent = ({ date, view }) =>
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