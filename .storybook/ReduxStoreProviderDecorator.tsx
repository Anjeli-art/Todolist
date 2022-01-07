import React  from "react"
import {Provider} from "react-redux";
import {AppRootType, store} from "../src/app/store";
import {todolistsReducer} from "../src/features/TodolistsList/todolist-reducer";
import {tasksReducer} from "../src/features/TodolistsList/tasks-reducer";
import {v1} from "uuid";
import {combineReducers, createStore} from "redux";
import {PriorytiesTask, TasksStatuses} from "../src/API/todolistAPI";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})


let initialGlobalState = {
    todolists: [
        {id: "todolist1", title: "title", filter: "all", addedDate: '', order: 0},
        {id: "todolist2", title: "title", filter: "all", addedDate: '', order: 0}
        ],

    tasks: {
        ["todolist1"]:
            [{
                description: "",
                title: "1",
                status: TasksStatuses.New,
                priority: PriorytiesTask.Low,
                startDate: "",
                deadline: "",
                id: v1(),
                todoListId:"todolist1" ,
                order: 0,
                addedDate: ""
            }],
        ["todolist2"]:
            [{
                description: "",
                title: "2",
                status: TasksStatuses.New,
                priority: PriorytiesTask.Low,
                startDate: "",
                deadline: "",
                id: v1(),
                todoListId:"todolist2" ,
                order: 0,
                addedDate: ""
            }]
    }

}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootType)


export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}