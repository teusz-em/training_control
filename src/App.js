import React, {useEffect, useState} from "react";
import {db} from "./firebase";
import './App.scss';
import MyCalendar from "./MyCalendar";
import NewEvent from "./newEvent";
import Tasks from "./Tasks";
import Calendar from "react-calendar";
import {format} from "date-fns";

function App() {
    const [value, setValue] = useState(new Date());
    const [tasks, setTasks] = useState(false)

    function onChange(nextValue) {
        setValue(nextValue);
    }

    console.log(value)

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
                console.log(tmp)
            })

    },[value])

    return (
    <div className="App">
      <header className="App-header">
          <NewEvent setTasks={setTasks}/>
          <MyCalendar onChange={onChange} value={value}/>
          <Tasks tasks={tasks} value={value}/>
      </header>
    </div>
  );
}

export default App;
