import React, {ChangeEvent} from "react";
import {filterType} from "./App";
import {Additemform} from "./Additemform";
import {Editablespan} from "./Editablespan";
import {Box, Button, Checkbox, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {addTaskAC, changedTaskStatusAC, changedTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "./state/store";



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    title: string
    TodoChanged: (value: filterType, todolistid: string) => void
    filter: filterType
    todolistid: string
    removeTodo: (todolistid: string) => void
    titleTodoStatus: (todolistid: string, Newvalue: string) => void
}


export function Todolist(props: TodolistType) {

    const tasks = useSelector<AppRootType, Array<TaskType>>(state => state.tasks[props.todolistid])
    const dispatch = useDispatch()

    const onButtonFilterClick1 = () => {
        props.TodoChanged("all", props.todolistid)
    }
    const onButtonFilterClick2 = () => {
        props.TodoChanged("active", props.todolistid)
    }
    const onButtonFilterClick3 = () => {
        props.TodoChanged("completed", props.todolistid)
    }

    const handlerTodoList = () => props.removeTodo(props.todolistid)

    const onChangeTitleTodo = (Newvalue: string) => {
        props.titleTodoStatus(props.todolistid, Newvalue)
    }

    let taskfortodolist = tasks

    if (props.filter === "completed") {
        taskfortodolist = taskfortodolist.filter(el => el.isDone)
    }
    if (props.filter === "active") {
        taskfortodolist = taskfortodolist.filter(el => !el.isDone)
    }

    return (
        <Box boxShadow={10} style={{padding: "15px",border:"3px #ffca28 solid",borderRadius:"10px",backgroundColor:"white"}}>
            <h3>
                <Editablespan title={props.title} onChange={onChangeTitleTodo}/>
                <IconButton aria-label="delete" color="default" onClick={handlerTodoList}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <Additemform callback={(title)=>dispatch(addTaskAC(title, props.todolistid))}/>
            <ul >
                {taskfortodolist.map(el => {
                        const deletedTask = () => {
                            dispatch(removeTaskAC(el.id, props.todolistid))
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>dispatch(changedTaskStatusAC(el.id, e.currentTarget.checked, props.todolistid))
                        const onChangeStatusHendler = (Newvalue: string) => {
                            dispatch(changedTaskTitleAC(el.id, Newvalue, props.todolistid))
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
                <Button variant={props.filter === "completed" ? "contained" : "text"} style={{padding: "2px"}}
                        onClick={onButtonFilterClick3}>complited
                </Button>
            </div>
        </Box>

    )

}

