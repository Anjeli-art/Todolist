import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";


export type filterType = "all" | "active" | "complited"
export type TodollistType = { id: string, title: string, filter: filterType }


function App() {
    let todolist1 = v1()
    let todolist2 = v1()

    let [todolist, setTodolist] = useState<Array<TodollistType>>([
        {id: todolist1, title: "what to learn", filter: "all"}, {
            id: todolist2, title: "what to bye", filter: "active"
        }])

    let [tasks, Settask] = useState(
        {
            [todolist1]: [{id: v1(), title: "html", isDone: true},
                {id: v1(), title: "css", isDone: true},
                {id: v1(), title: "js", isDone: false},
                {id: v1(), title: "restAPI", isDone: true},
                {id: v1(), title: "graphQL", isDone: false}],

            [todolist2]:
                [{id: v1(), title: "book", isDone: true},
                    {id: v1(), title: "milk", isDone: true},]
        })


    let removeTask = (idTask: string, todolistid: string) => {
        let todotasks = tasks[todolistid]
        tasks[todolistid] = todotasks.filter(el => el.id !== idTask)
        Settask({...tasks})
    }
    let removeTodo = (todolistid: string) => {
        let filtertodo=todolist.filter(el=>el.id!==todolistid)
        setTodolist(filtertodo)
        delete tasks[todolistid]
        Settask({...tasks})
    }

    let taskChanged = (value: filterType, todolistid: string) => {
        let todolistNew = todolist.find(el => el.id === todolistid)
        if (todolistNew) {
            todolistNew.filter = value
            setTodolist([...todolist])
        }
    }


    let addTask = (title: string, todolistid: string) => {
        const task = {id: v1(), title: title, isDone: false}
        const tasksobj = tasks[todolistid]
        tasks[todolistid] = [task, ...tasksobj]
        Settask({...tasks})
    }

    let changeStatus = (idTask: string, isDone: boolean, todolistid: string) => {
        const tasksobj = tasks[todolistid]
        let newTask = tasksobj.find(el => el.id === idTask)
        if (newTask) {
            newTask.isDone = isDone
            Settask({...tasks})
        }
    }


    return (
        <div className="App">
            {todolist.map(el => {
                let taskfortodolist = tasks[el.id]

                if (el.filter === "complited") {
                    taskfortodolist = taskfortodolist.filter(el => el.isDone)
                }
                if (el.filter === "active") {
                    taskfortodolist = taskfortodolist.filter(el => !el.isDone)
                }
                return <Todolist title={el.title}
                                 key={el.id}
                                 todolistid={el.id}
                                 tasks={taskfortodolist}
                                 removeTask={removeTask}
                                 taskChanged={taskChanged}
                                 addTask={addTask}
                                 changeStatus={changeStatus}
                                 filter={el.filter}
                                 removeTodo={removeTodo}
                />
            })}
        </div>)
}

export default App;
