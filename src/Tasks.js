import React, {useEffect, useState} from "react";
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const TaskList = ({tasks, value, onDelete}) => {
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
                {tasks.map((task, i) => {
                        return (
                            <ul key={i} className={"tasks__list"}>
                                <li className={"date"}><span>{new Date(task.date.seconds * 1000).toLocaleDateString()}</span></li>
                                <li>{task.form.duration} min</li>
                                <li>{task.form.difficulty}</li>
                                <li>{task.form.hr} bpm</li>
                                <button className={"form__trash--btn"}  onClick={() => onDelete(task.id)}><FontAwesomeIcon className={"form__trash"} icon={faTrash}/></button>
                            </ul>
                        )
                    }
                )}
            </div>
        )
}

export default TaskList