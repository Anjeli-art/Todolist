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
    removeTask: (idTask: string, todolistid: string) => void
    taskChanged: (value: filterType, todolistid: string) => void
    changeStatus: (idTask: string, isDone: boolean, todolistid: string) => void
    addTask: (title: string, todolistid: string) => void
    filter: filterType
    todolistid: string
    removeTodo: (todolistid: string) => void
}

export function Todolist(props: TodolistType) {

    let [title, setTitle] = useState("")

    const inputHandlerCnange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            debugger
            props.addTask(title.trim(), props.todolistid)
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
        props.taskChanged("all", props.todolistid)
    }
    const onButtonFilterClick2 = () => {
        props.taskChanged("active", props.todolistid)
    }
    const onButtonFilterClick3 = () => {
        props.taskChanged("complited", props.todolistid)
    }
    const handlerTodoList = () => props.removeTodo(props.todolistid)

    return (
        <div>
            <h3>{props.title}
                <button onClick={handlerTodoList}>x</button>
            </h3>
            <div>
                <input value={title} onChange={inputHandlerCnange} onKeyPress={onEnterHandler}
                       className={error ? "error" : ""}/>
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(el => {
                        const deletedTask = () => {
                            props.removeTask(el.id, props.todolistid)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(el.id, e.currentTarget.checked, props.todolistid)
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