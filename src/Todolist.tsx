import React, {ChangeEvent} from "react";
import {filterType} from "./App";
import {Additemform} from "./Additemform";
import {Editablespan} from "./Editablespan";
import {Box, Button, Checkbox, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';


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
    changeTaskTitle: (id: string, Newvalue: string, todolistid: string) => void
    titleTodoStatus: (todolistid: string, Newvalue: string) => void
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

    const onChangeTitleTodo = (Newvalue: string) => {
        props.titleTodoStatus(props.todolistid, Newvalue)
    }
    return (
        <Box boxShadow={10} style={{padding: "15px",border:"3px #ffca28 solid",borderRadius:"10px",backgroundColor:"white"}}>
            <h3>
                <Editablespan title={props.title} onChange={onChangeTitleTodo}/>
                <IconButton aria-label="delete" color="default" onClick={handlerTodoList}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <Additemform callback={addTask}/>
            <ul >
                {props.tasks.map(el => {
                        const deletedTask = () => {
                            props.removeTask(el.id, props.todolistid)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(el.id, e.currentTarget.checked, props.todolistid)
                        const onChangeStatusHendler = (Newvalue: string) => {
                            props.changeTaskTitle(el.id, Newvalue, props.todolistid)
                        }
                        return <li style={{ listStyleType: "none" }} key={el.id} className={el.isDone ? "is-done" : ""}>
                            <Checkbox
                                checked={el.isDone} onChange={onChangeHandler}
                                color="default"
                                inputProps={{'aria-label': 'checkbox with default color'}}
                            />
                            <IconButton aria-label="delete" color="default" onClick={deletedTask}>
                                <DeleteIcon/>
                            </IconButton>
                            <Editablespan title={el.title} onChange={onChangeStatusHendler}/>
                        </li>
                    }
                )}
            </ul>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"} style={{padding: "2px",}}
                        onClick={onButtonFilterClick1}>all
                </Button>
                <Button variant={props.filter === "active" ? "contained" : "text"} style={{padding: "2px"}}
                        onClick={onButtonFilterClick2}>active
                </Button>
                <Button variant={props.filter === "complited" ? "contained" : "text"} style={{padding: "2px"}}
                        onClick={onButtonFilterClick3}>complited
                </Button>
            </div>
        </Box>

    )

}

