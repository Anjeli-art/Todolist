import {applyMiddleware, combineReducers, createStore} from "redux";
import {ActionTypeTodolists, todolistsReducer} from "../features/TodolistsList/todolist-reducer";
import {ActionTypeTasks, tasksReducer} from "../features/TodolistsList/tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {AppActionType, appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app:appReducer
})
export type AppRootType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer,applyMiddleware(thunk))

export type AppRootActionType=ActionTypeTasks|ActionTypeTodolists|AppActionType

export type AppThunk<ReturnType=void>=ThunkAction<ReturnType, AppRootType, unknown, AppRootActionType>
// @ts-ignore
window.store = store