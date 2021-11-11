import React, {useEffect, useState} from "react";
import {db} from "./firebase";
import './App.scss';
import MyCalendar from "./MyCalendar";
import NewEvent from "./newEvent";
import Tasks from "./Tasks";

function App() {
    const [value, setValue] = useState(new Date());
    const [tasks, setTasks] = useState([]);
    const [modal, setModal] = useState(true)


    function onChange(nextValue) {
        setValue(nextValue);
    }

    function onDelete(id) {
        db.collection("new task").doc(id).delete()
            .then(() => {
                const updatedValues = [...tasks].filter((task) => task.id !== id)
                setTasks(updatedValues)
                })
    }

    useEffect(() => {

        const start = new Date(`${value.getFullYear()}-${value.getMonth() + 1}-01`);
        const end = new Date(`${value.getFullYear()}-${value.getMonth() + 1}-31`);

        db.collection("new task")
            .where( "date", ">", start )
            .where( "date", "<", end )
            .orderBy("date")
            .get()
            .then((querySnapshot) => {
                const tmp = [];
                querySnapshot.forEach((doc) => {
                    tmp.push({
                        ...doc.data(),
                        id: doc.id
                    })
                });
                setTasks(tmp);
            })
    },[value])

    return (
    <div className="App">
      <header className="App-header">
          <NewEvent setTasks={setTasks} setModal={setModal} modal={modal}/>
          <MyCalendar onChange={onChange} value={value} setModal={setModal} modal={modal}/>
          <Tasks tasks={tasks} value={value} onDelete={onDelete}/>
      </header>
    </div>
  );
}

export default App;
