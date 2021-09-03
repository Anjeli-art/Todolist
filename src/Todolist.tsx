import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterType} from "./App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    title: string
    tasks: Array<TaskType>
    taskDelet: (idTask: string) => void
    taskChanged: (value: filterType) => void
    changeStatus: () => void
    addTask: (title: string) => void
}

export function Todolist(props: TodolistType) {

    let [title, setTitle] = useState("")

    const inputHandlerCnange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }

    const addTask = () => {
        props.addTask(title)
        setTitle("")
    }

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask()
        }
    }

    const onButtonFilterClick1 = () => {
        props.taskChanged("all")
    }
    const onButtonFilterClick2 = () => {
        props.taskChanged("active")
    }
    const onButtonFilterClick3 = () => {
        props.taskChanged("complited")
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={inputHandlerCnange} onKeyPress={onEnterHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {
                        const deletedTask = () => {
                            props.taskDelet(el.id)
                        }
                        return <li key={el.id}><input type="checkbox" checked={el.isDone}/>
                            <button onClick={deletedTask}>x</button>
                            {el.title}</li>
                    }
                )}
            </ul>
            <div>
                <button onClick={onButtonFilterClick1}>all</button>
                <button onClick={onButtonFilterClick2}>active</button>
                <button onClick={onButtonFilterClick3}>complited</button>
            </div>
        </div>

    )

}