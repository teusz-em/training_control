import React from "react";
import Calendar from "react-calendar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare} from '@fortawesome/free-solid-svg-icons'



const MyCalendar = ({onChange, value, setModal, modal}) => {

    const tileContent = ({view }) =>
        view === "month"

    return (
        <>
            <div className={"calendar_wrapper"}>
                <Calendar
                    tileContent={tileContent}
                    onChange={onChange}
                    defaultView="month"
                    value={value}
                    prev2Label={null}
                    next2Label={null}
                />
                <div className={"form__close"} onClick={() => setModal(!modal)}>
                    <span className={"calendar__span"}>ADD</span>
                    <FontAwesomeIcon icon={faPlusSquare} className={"calendar__icon"} size={"3x"}  />
                </div>
            </div>

        </>

    );
};

export default MyCalendar