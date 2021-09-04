import React, {ChangeEvent} from "react";
import {filterType} from "./App";
import {Additemform} from "./Additemform";
import {Editablespan} from "./Editablespan";


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
    changeTaskTitle:(id:string,Newvalue:string ,todolistid:string)=>void
    titleTodoStatus:(todolistid:string,Newvalue: string)=>void
}

export function Todolist(props: TodolistType) {

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
    const addTask = (title: string) => {
        props.addTask(title, props.todolistid)
    }

    const onChangeTitleTodo=(Newvalue: string)=>{props.titleTodoStatus(props.todolistid,Newvalue)}
    return (
        <div className="todo">
            <h3>
                <Editablespan title={props.title} onChange={onChangeTitleTodo}/>
                <button onClick={handlerTodoList}>x</button>
            </h3>
            <Additemform callback={addTask}/>
            <ul>
                {props.tasks.map(el => {
                        const deletedTask = () => {
                            props.removeTask(el.id, props.todolistid)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(el.id, e.currentTarget.checked, props.todolistid)
                        const onChangeStatusHendler = (Newvalue: string) => {props.changeTaskTitle(el.id,Newvalue , props.todolistid)}
                        return <li key={el.id} className={el.isDone ? "is-done" : ""}>
                            <input type="checkbox" checked={el.isDone} onChange={onChangeHandler}/>
                            <button onClick={deletedTask}>x</button>
                            <Editablespan title={el.title} onChange={onChangeStatusHendler}/>
                        </li>
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

