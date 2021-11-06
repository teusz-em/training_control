import React, {useEffect, useState} from "react";
import {db} from "./firebase";
import Calendar from "react-calendar";
import { format } from 'date-fns'

const TaskList = ({tasks}) => {

    if (!tasks) {
        return (
            <h2>loading...</h2>
        )
    }
    // if (Calendar.value.getMonth() === tasks.map)
        return (
            <div className={"tasks__container"}>
                {tasks.map(task => {

                        return (
                            <ul className={"tasks__list"}>
                                <li className={"date"}>{new Date(task.date.seconds * 1000).toLocaleString()}</li>
                                <li>{task.form.duration} min</li>
                                <li>{task.form.difficulty}</li>
                                <li>{task.form.hr} bpm</li>
                            </ul>
                        )
                    }
                )}

            </div>
        )

}


export default TaskList