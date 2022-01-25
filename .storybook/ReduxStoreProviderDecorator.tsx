import React from "react"
import {Provider} from "react-redux";
import {AppRootType} from "../src/app/store";
import {todolistsReducer} from "../src/features/TodolistsList/todolist-reducer";
import {tasksReducer} from "../src/features/TodolistsList/tasks-reducer";
import {v1} from "uuid";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {PriorytiesTask, TasksStatuses} from "../src/API/todolistAPI";
import {appReducer, StatusType} from "../src/app/app-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})


let initialGlobalState = {
    todolists: [
        {id: "todolist1", title: "title", filter: "all", addedDate: '', order: 0, entityStatus: "idle"},
        {id: "todolist2", title: "title", filter: "all", addedDate: '', order: 0, entityStatus: "loading"}
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
                todoListId: "todolist1",
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
                todoListId: "todolist2",
                order: 0,
                addedDate: ""
            }]
    },
    app: {
        status: "idle",
        error: null
    },
    auth: {
        isLoggedIn: false,
        isInitialized: false,
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootType, applyMiddleware(thunk))


export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
