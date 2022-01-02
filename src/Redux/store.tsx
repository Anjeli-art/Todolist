import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
export type AppRootType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer,applyMiddleware(thunk))

// @ts-ignore
window.store = store