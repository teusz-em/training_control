import React, {useEffect, useState} from "react";
import {db} from "./firebase";
import Calendar from "react-calendar";
import { format } from 'date-fns'

const TaskList = ({tasks, value}) => {
    const [month, setMonth] = useState('')


    useEffect(() => {
        setMonth((format(value, 'MMMM')))
    },[value])



    if (!tasks) {
        return (
            <h2>loading...</h2>
        )
    }

        return (
            <div className={"tasks__container"}>
                <h1 className={"tasks__month"}>{month}</h1>
                {tasks.map(task => {

                        return (
                            <ul className={"tasks__list"}>
                                <li className={"date"}>{new Date(task.date.seconds * 1000).toLocaleDateString()}</li>
                                <li>{task.form.duration} min</li>
                                <li>{task.form.difficulty}</li>
                                <li>{task.form.hr} bpm</li>
                                <button onClick={(e) => db.collection("new task").doc(task.id).delete().then }>delete</button>

                            </ul>
                        )
                    }
                )}

            </div>
        )
}


export default TaskList