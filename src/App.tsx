import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";


export type filterType = "all" | "active" | "complited"

function App() {
    let [tasks, Settask] = useState<Array<TaskType>>([{id: 1, title: "html", isDone: true},
        {id: 2, title: "css", isDone: true},
        {id: 3, title: "js", isDone: false},
        {id: 4, title: "restAPI", isDone: true},
        {id: 5, title: "graphQL", isDone: false}])


    let taskDelet = (idTask: number) => {
        const newTasks = tasks.filter(el => el.id !== idTask)
        Settask(newTasks)
    }

    let [filter, setFilter] = useState<filterType>("all")

    let taskChanged=(value:filterType)=>{
        setFilter(value)
    }

    let taskfortodolist = tasks

    if (filter === "complited") {
        taskfortodolist = tasks.filter(el => el.isDone)
    }
    if (filter === "active") {
        taskfortodolist = tasks.filter(el => !el.isDone)
    }


    return (
        <div className="App">
            <Todolist title={"what to learn"} tasks={taskfortodolist} taskDelet={taskDelet} taskChanged={taskChanged}/>
        </div>

    );
}

export default App;
