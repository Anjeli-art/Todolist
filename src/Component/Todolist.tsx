import React, { useCallback} from "react";
import {filterType} from "../App";
import {Box, Button, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {addTaskAC} from "../Redux/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../Redux/store";
import {Task} from "./Task";
import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "./AddItemForm";


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


export const Todolist:React.FC<TodolistType> = React.memo((props) => {

    const tasks = useSelector<AppRootType, Array<TaskType>>(state => state.tasks[props.todolistid])
    const dispatch = useDispatch()

    const onButtonFilterClick1 = useCallback(() => {
        props.TodoChanged("all", props.todolistid)
    }, [props.TodoChanged, props.todolistid])
    const onButtonFilterClick2 = useCallback(() => {
        props.TodoChanged("active", props.todolistid)
    }, [props.TodoChanged, props.todolistid])
    const onButtonFilterClick3 = useCallback(() => {
        props.TodoChanged("completed", props.todolistid)
    }, [props.TodoChanged, props.todolistid])

    const handlerTodoList = () => props.removeTodo(props.todolistid)

    const onChangeTitleTodo = useCallback((Newvalue: string) => {
        props.titleTodoStatus(props.todolistid, Newvalue)
    }, [props.titleTodoStatus, props.todolistid])

    let taskfortodolist = tasks

    if (props.filter === "completed") {
        taskfortodolist = taskfortodolist.filter(el => el.isDone)
    }
    if (props.filter === "active") {
        taskfortodolist = taskfortodolist.filter(el => !el.isDone)
    }
    return (
        <Box boxShadow={10}
             style={{padding: "15px", border: "3px #ffca28 solid", borderRadius: "10px", backgroundColor: "white"}}>
            <h3>
                <EditableSpan title={props.title} onChange={onChangeTitleTodo}/>
                <IconButton aria-label="delete" color="default" onClick={handlerTodoList}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm
                callback={useCallback((title) => {
                    dispatch(addTaskAC(title, props.todolistid))
                }, [dispatch, props.todolistid])}/>
            <ul>
                {taskfortodolist.map(el => {
                        return <Task task={el} todoId={props.todolistid} key={el.id}/>
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

})



