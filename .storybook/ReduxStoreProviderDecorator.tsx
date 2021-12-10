import React     from "react"
import {Provider} from "react-redux";
import {AppRootType, store} from "../src/Redux/store";
import {todolistsReducer} from "../src/Redux/todolist-reducer";
import {tasksReducer} from "../src/Redux/tasks-reducer";
import {v1} from "uuid";
import {combineReducers, createStore} from "redux";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})


let initialGlobalState = {
    todolists: [
        {id: "todolist1", title: "what to learn", filter: "all"}, {
            id: "todolist2", title: "what to bye", filter: "active"
        }],

    tasks: {
        ["todolist1"]:
            [{id: v1(), title: "html", isDone: true},
                {id: v1(), title: "css", isDone: true},
                {id: v1(), title: "js", isDone: false},],
        ["todolist2"]:
            [{id: v1(), title: "book", isDone: true},
                {id: v1(), title: "milk", isDone: true},]
    }

}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootType)


export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}