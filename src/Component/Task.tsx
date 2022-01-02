import React, {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changedTaskStatusAC, changedTaskTitleAC, removeTaskAC} from "../Redux/tasks-reducer";
import {Checkbox, IconButton} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {EditableSpan} from "./EditableSpan";
import {TasksStatuses, TasksType} from "../API/todolistAPI";


type TaskPropsType = {
    task: TasksType
    todoId: string
}

export const Task: React.FC<TaskPropsType> = React.memo(({task, todoId}) => {

    const dispatch = useDispatch()

    const deletedTask = useCallback(() => {
        dispatch(removeTaskAC(task.id, todoId))
    }, [dispatch, task.id, todoId])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changedTaskStatusAC(task.id, e.currentTarget.checked ? TasksStatuses.Completed:TasksStatuses.New, todoId))
    }, [dispatch, task.id, todoId])

    const onChangeStatusHendler = useCallback((Newvalue: string) => {
        dispatch(changedTaskTitleAC(task.id, Newvalue, todoId))
    }, [dispatch, task.id, todoId])

    return <li style={{listStyleType: "none"}} className={task.status=== TasksStatuses.Completed? "is-done" : ""}>
        <Checkbox
            checked={task.status===TasksStatuses.Completed} onChange={onChangeHandler}
            color="default"
            inputProps={{'aria-label': 'checkbox with default color'}}
        />
        <IconButton aria-label="delete" color="default" onClick={deletedTask}>
            <DeleteIcon/>
        </IconButton>
        <EditableSpan title={task.title} onChange={onChangeStatusHendler}/>
    </li>
})