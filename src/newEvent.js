import React, {useState} from "react";
import DatePicker from 'react-date-picker';
import { compareAsc, format } from 'date-fns'
import {db} from "./firebase";

const NewEvent = ({setTasks}) => {

    const [form, setForm] = useState( {duration: '', difficulty: '', hr: '' })
    const [date, setDate] = useState(new Date());


    const onChange = (e) => {
        const {name, value} = e.target;
        setForm(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        db.collection("new task").add({
            form,
            date
        })
            .then((docRef) => {
                console.log(docRef)
                setTasks(state => [...state, {id: docRef, form, date: {seconds: date.getTime() / 1000}}]);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    return (
        <div className={"form__wrapper"}>
            <h1 className={"form__heading"}>Add new training</h1>
            <form className={"form__event"}  onSubmit={handleSubmit}>
                <div className={"form__input"}>

                    <input className={"form__duration"}
                           type={"number"}
                           name="duration"
                           value={form.duration}
                           onChange={onChange}
                           placeholder={"enter training duration"}
                    />

                    <select className={"form__difficulty"}
                           type="text"
                           name="difficulty"
                           value={form.difficulty}
                           onChange={onChange}>
                        <option value={"easy"}>easy</option>
                        <option value={"medium"}>medium</option>
                        <option value={"hard"}>hard</option>
                    </select>

                    <input className={"form__hr"}
                           type={"number"}
                           name="hr"
                           value={form.hr}
                           onChange={onChange}
                           placeholder={"enter heart rate"}/>
                    <DatePicker value={date}
                                onChange={setDate}
                    />
                    <input className={"form__submit"} type={"submit"} value={"Zapisz"}/>
                </div>
            </form>
        </div>

    );
};




export default NewEvent