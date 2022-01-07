import React from "react"
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../../../../.storybook/ReduxStoreProviderDecorator";
import {PriorytiesTask, TasksStatuses} from "../../../../API/todolistAPI";


export default {
    title: 'Task stories',
    component: Task,
    decorators:[ReduxStoreProviderDecorator]
}


export const TaskBaseExample = (props: any) => {
    return <>
        <Task task={{
            description:"",
            title: "",
            status: TasksStatuses.Completed,
            priority: PriorytiesTask.Low,
            startDate: "",
            deadline: "",
            id: "1",
            todoListId: "",
            order: 0,
            addedDate: ''
        }} todoId={"todolist1"}/>
        <Task task={{
            description:"",
            title: "",
            status: TasksStatuses.Draft,
            priority: PriorytiesTask.Middle,
            startDate: "",
            deadline: "",
            id: "1",
            todoListId: "",
            order: 0,
            addedDate: ''
        }} todoId={"todolist2"}/>
    </>
}
