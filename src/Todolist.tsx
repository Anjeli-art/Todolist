import React from "react";
import {filterType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistType = {
    title: string
    tasks: Array<TaskType>
    taskDelet: (idTask: number) => void
    taskChanged: (value: filterType) => void

}

export function Todolist(props: TodolistType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(el => <li key={el.id}><input type="checkbox" checked={el.isDone}/>
                    <button onClick={() => props.taskDelet(el.id)}>x</button>
                    {el.title}</li>)}
            </ul>
            <div>
                <button onClick={() => props.taskChanged("all")}>all</button>
                <button onClick={() => props.taskChanged("active")}>active</button>
                <button onClick={() => props.taskChanged("complited")}>complited</button>
            </div>
        </div>

    )

}