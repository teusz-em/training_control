import React, {useEffect, useState} from "react";
import {db} from "./firebase";
import './App.scss';
import MyCalendar from "./MyCalendar";
import NewEvent from "./newEvent";
import Tasks from "./Tasks";



function App() {
    const [value, onChange] = useState(new Date());

    const [tasks, setTasks] = useState(false)

    useEffect(() => {

        db.collection("new task")
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
          <MyCalendar/>
          <Tasks tasks={tasks}/>
      </header>
    </div>
  );
}

export default App;
