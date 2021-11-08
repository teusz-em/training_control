import React, {useEffect, useState} from "react";
import {db} from "./firebase";
import './App.scss';
import MyCalendar from "./MyCalendar";
import NewEvent from "./newEvent";
import Tasks from "./Tasks";
import Calendar from "react-calendar";



function App() {
    const [value, onChange] = useState(new Date());
    const [tasks, setTasks] = useState(false)
    const [active, setActive] = useState('')

    useEffect(() => {

        db.collection("new task")
            // .where( "date", "==", "19.11.2021" )
            .get()
            .then((querySnapshot) => {
                const tmp = [];
                querySnapshot.forEach((doc) => {
                    tmp.push({
                        ...doc.data(),
                        id: doc.id
                    })
                    console.log(tmp)
                });
                setTasks(tmp);


            })
    },[])

    return (
    <div className="App">
      <header className="App-header">
          <NewEvent setTasks={setTasks}/>
          <MyCalendar setActive={setActive}/>
          <Tasks tasks={tasks}/>
      </header>
    </div>
  );
}

export default App;
