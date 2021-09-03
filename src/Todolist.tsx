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
    changeStatus: (idTask: string, isDone: boolean) => void
    addTask: (title: string) => void
    filter: filterType
}

export function Todolist(props: TodolistType) {

    let [title, setTitle] = useState("")

    const inputHandlerCnange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim())
            setTitle("")
        } else {
            setError("title is required")
        }
    }

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
                <input value={title} onChange={inputHandlerCnange} onKeyPress={onEnterHandler}
                       className={error ? "error" : ""}/>
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(el => {
                        const deletedTask = () => {
                            props.taskDelet(el.id)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(el.id, e.currentTarget.checked)
                        return <li key={el.id} className={el.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   checked={el.isDone}
                                   onChange={onChangeHandler}/>
                            <button onClick={deletedTask}>x</button>
                            {el.title}</li>
                    }
                )}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onButtonFilterClick1}>all
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onButtonFilterClick2}>active
                </button>
                <button className={props.filter === "complited" ? "active-filter" : ""}
                        onClick={onButtonFilterClick3}>complited
                </button>
            </div>
        </div>

    )

}