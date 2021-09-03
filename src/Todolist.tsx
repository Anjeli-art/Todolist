import React from "react";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistType = {
    title: string
    task: Array<TaskType>
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
                <li><input type="checkbox" checked={props.task[0].isDone}/><span>{props.task[0].title}</span></li>
                <li><input type="checkbox" checked={props.task[1].isDone}/><span>{props.task[1].title}</span></li>
                <li><input type="checkbox" checked={props.task[2].isDone}/><span>{props.task[2].title}</span></li>
            </ul>
            <div>
                <button>all</button>
                <button>active</button>
                <button>complited</button>
            </div>
        </div>

    )

}