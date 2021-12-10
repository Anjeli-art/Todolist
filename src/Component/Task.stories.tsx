import React from "react"
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../.storybook/ReduxStoreProviderDecorator";


export default {
    title: 'Task stories',
    component: Task,
    decorators:[ReduxStoreProviderDecorator]
}


export const TaskBaseExample = (props: any) => {
    return <>
        <Task task={{id: "1", isDone: true, title: "css"}} todoId={"todolist1"}/>
        <Task task={{id: "2", isDone: false, title: "js"}} todoId={"todolist2"}/>
    </>
}
