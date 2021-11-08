import React, {useState} from "react";
import DatePicker from 'react-date-picker';
import { compareAsc, format } from 'date-fns'
import {db} from "./firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'

const NewEvent = ({setTasks}) => {

    const [form, setForm] = useState( {duration: '', difficulty: '', hr: '' })
    const [date, setDate] = useState(new Date());
    const [modal, setModal] = useState(true)

    const onChange = (e) => {
        const {name, value} = e.target;
        setForm(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    }

    const onModalChange = () => {
        setModal(!modal)
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        setModal(!modal)

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

    if (modal === false) {
        return <div  className={"form__close"} onClick={onModalChange}>
            <span className={"calendar__span"}>ADD</span>
            <FontAwesomeIcon icon={faPlusSquare} className={"calendar__icon"} size={"3x"}  />
        </div>
    }
    return (
        <>
            <div className={"form__wrapper form__none"}>
                <form className={"form__event"}  onSubmit={handleSubmit}>
                    <h1 className={"form__heading"}><span>Add</span> new training</h1>
                    <div className={"form__input"}>
                        <div className={"form__box"}>
                            <input className={"form__inputs"}
                                   type={"number"}
                                   name="duration"
                                   value={form.duration}
                                   onChange={onChange}
                                    placeholder={" "}
                                   id="duration"
                            />
                            <label className={"form__label"} for='duration'>Traning duration</label>
                        </div>
                        <div className={"form__box"}>
                            <input className={"form__inputs"}
                                    typeof={"text"}
                                    name="difficulty"
                                    value={form.difficulty}
                                    onChange={onChange}
                                    placeholder= {' '}
                            />
                            <label className={"form__label"} For='difficulty'>Trening type</label>
                        </div>

                        <div className={"form__box"}>
                            <input className={"form__inputs"}
                                   type={"number"}
                                   name="hr"
                                   value={form.hr}
                                   onChange={onChange}
                                   placeholder={" "}/>
                            <label className={"form__label"} For='duration'>Heart rate</label>
                        </div>

                        <DatePicker value={date}
                                    onChange={setDate}
                        />
                        <input className={"form__submit"} type={"submit"} value={"Save training"}/>
                    </div>
                </form>
            </div>

        </>


    );
};


export default NewEvent