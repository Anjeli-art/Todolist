import {v1} from "uuid";
import {todolistApi, TodolistsType} from "../API/todolistAPI";
import {Dispatch} from "redux";


type ActionType =
    ActionTypeRemoveTodolist
    | ActionTypeAddTodolist
    | ActionTypeChangeTitle
    | ActionTypeChangeFilter
    | ActionTypeSetTodos

export type ActionTypeRemoveTodolist = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type ActionTypeAddTodolist = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ActionTypeChangeTitle = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ActionTypeChangeFilter = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: filterType
}

export type ActionTypeSetTodos = {
    type: "SET-TODO",
    todos: Array<TodolistsType>
}
export const todolist1 = v1()
export const todolist2 = v1()

export type filterType = "all" | "active" | "completed"
export type TodolistsTypeEntity = TodolistsType & { filter:filterType }

const initialState: Array<TodolistsTypeEntity> = []

export const todolistsReducer = (state: Array<TodolistsTypeEntity> = initialState, action: ActionType): Array<TodolistsTypeEntity> => {

    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.id)
        }

        case 'ADD-TODOLIST': {
            return [{id: action.todolistId, title: action.title, filter: "all", addedDate: '', order: 0}, ...state]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            let newState = state.find(el => el.id === action.id)
            if (newState) {
                newState.title = action.title

            }
            return [...state]
        }
        case'CHANGE-TODOLIST-FILTER': {
            let newState = state.find(el => el.id === action.id)
            if (newState) {
                newState.filter = action.filter

            }
            return [...state]
        }

        case"SET-TODO":
            return action.todos.map(el=>{return{...el,filter:"all"}})
        default:
            return state
    }
};

export const removeTodolistAC = (todolistId: string): ActionTypeRemoveTodolist => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    }
}
export const addTodolistAC = (newTodolistTitle: string): ActionTypeAddTodolist => {
    return {
        type: 'ADD-TODOLIST',
        title: newTodolistTitle,
        todolistId: v1()
    }
}
export const changeTitleTodoAC = (todolistId: string, newTodolistTitle: string): ActionTypeChangeTitle => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId,
        title: newTodolistTitle
    }
}
export const changeFilterTodoAC = (filter: filterType, todolistId: string): ActionTypeChangeFilter => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId,
        filter: filter
    }
}

export const setTodosAC = (todosArray: Array<TodolistsType>): ActionTypeSetTodos => {
    return {
        type: "SET-TODO",
        todos: todosArray
    }
}

export const setTodoThunk=()=>(dispatch:Dispatch)=>{
   todolistApi.getTodolists()
       .then((res)=>{
        dispatch(setTodosAC(res.data))})

}