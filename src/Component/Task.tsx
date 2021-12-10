import React, {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changedTaskStatusAC, changedTaskTitleAC, removeTaskAC} from "../Redux/tasks-reducer";
import {Checkbox, IconButton} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
    todoId: string
}

export const Task =React.memo((props: TaskPropsType) => {

    const dispatch = useDispatch()

    const deletedTask = useCallback(() => {
        dispatch(removeTaskAC(props.task.id, props.todoId))
    }, [dispatch, props.task.id, props.todoId])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changedTaskStatusAC(props.task.id, e.currentTarget.checked, props.todoId))
    }, [dispatch, props.task.id, props.todoId])

    const onChangeStatusHendler = useCallback((Newvalue: string) => {
        dispatch(changedTaskTitleAC(props.task.id, Newvalue, props.todoId))
    }, [dispatch, props.task.id, props.todoId])

    return <li style={{listStyleType: "none"}} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.task.isDone} onChange={onChangeHandler}
            color="default"
            inputProps={{'aria-label': 'checkbox with default color'}}
        />
        <IconButton aria-label="delete" color="default" onClick={deletedTask}>
            <DeleteIcon/>
        </IconButton>
        <EditableSpan title={props.task.title} onChange={onChangeStatusHendler}/>
    </li>
})