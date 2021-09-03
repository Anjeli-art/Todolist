import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";


export type filterType = "all" | "active" | "complited"

function App() {
    let [tasks, Settask] = useState<Array<TaskType>>([{id: v1(), title: "html", isDone: true},
        {id: v1(), title: "css", isDone: true},
        {id: v1(), title: "js", isDone: false},
        {id: v1(), title: "restAPI", isDone: true},
        {id: v1(), title: "graphQL", isDone: false}])


    let taskDelet = (idTask: string) => {
        const newTasks = tasks.filter(el => el.id !== idTask)
        Settask(newTasks)
    }

    let [filter, setFilter] = useState<filterType>("all")

    let taskChanged = (value: filterType) => {
        setFilter(value)
    }

    let taskfortodolist = tasks

    if (filter === "complited") {
        taskfortodolist = tasks.filter(el => el.isDone)
    }
    if (filter === "active") {
        taskfortodolist = tasks.filter(el => !el.isDone)
    }

    let addTask = (title: string) => {
        const newId = v1()
        const newTasks = [{id: newId, title: title, isDone: false}, ...tasks]
        Settask(newTasks)
    }

    let changeStatus = (idTask: string, isDone: boolean) => {
        let newTask = tasks.find(el => el.id === idTask)
        if (newTask) {
            newTask.isDone = isDone
        }
        Settask([...tasks])
    }


    return (
        <div className="App">
            <Todolist title={"what to learn"}
                      tasks={taskfortodolist}
                      taskDelet={taskDelet}
                      taskChanged={taskChanged}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filter}
            />
        </div>

    );
}

export default App;
