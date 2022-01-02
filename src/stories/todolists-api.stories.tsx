import React, {useEffect, useState} from 'react'
import {PriorytiesTask, taskApi, TasksStatuses, todolistApi} from "../API/todolistAPI";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolists().then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       const title="2222"
        todolistApi.createTodolist(title).then((res) => {
            setState(res.data.data)
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id="b5655841-351b-4600-b4a3-cbcd2eb86813"
        todolistApi.deleteTodolist(id).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId="5bddc4f8-244e-4776-bc13-23cd581bf92f"
        const title="2222"
        todolistApi.updateTodolistTitle({title,todolistId}).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId=""
        taskApi.getTask(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId=""
        const title="2222"
        taskApi.createTask(title,todolistId).then((res) => {
            setState(res.data.data)
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id=""
        const taskid=""
        taskApi.deleteTask(id,taskid).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId=""
        const model={
            title: "",
            description: "",
            completed: false,
            status: TasksStatuses.New,
            priority: PriorytiesTask.Low,
            startDate: "",
            deadline: ""
        }
        const taskid=""
        taskApi.updateTask(model,todolistId,taskid).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}