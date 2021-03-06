import React, {useState} from "react";
import DatePicker from 'react-date-picker';
import {db} from "./firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSignInAlt, faSave} from '@fortawesome/free-solid-svg-icons'

const NewEvent = ({setTasks, setModal, modal}) => {
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
                setTasks(state => [...state, {id: docRef, form, date: {seconds: date.getTime() / 1000}}]);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

        setForm({duration: '', difficulty: '', hr: ''})
    }

    if (modal === false) {
        return <></>
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
                            <label className={"form__label"}>Traning duration</label>
                        </div>

                        <div className={"form__box"}>
                            <input className={"form__inputs"}
                                    typeof={"text"}
                                    name="difficulty"
                                    value={form.difficulty}
                                    onChange={onChange}
                                    placeholder= {' '}
                            />
                            <label className={"form__label"}>Traning type</label>
                        </div>

                        <div className={"form__box"}>
                            <input className={"form__inputs"}
                                   type={"number"}
                                   name="hr"
                                   value={form.hr}
                                   onChange={onChange}
                                   placeholder={" "}
                            />
                            <label className={"form__label"}>Heart rate</label>
                        </div>

                        <DatePicker value={date}
                                    onChange={setDate}
                        />
                        <div className={"form__buttons"}>
                            <button className={"form__submit"} type={"submit"} value={"Save training"}> <FontAwesomeIcon icon={faSave}/></button>
                            <button className={"form__plans"} onClick={onModalChange}> <FontAwesomeIcon icon={faSignInAlt}/></button>
                        </div>

                    </div>

                </form>

            </div>

        </>


    );
};


export default NewEvent