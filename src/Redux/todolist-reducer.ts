import {filterType, TodolistType} from "../App";
import {v1} from "uuid";


type ActionType = ActionTypeRemoveTodolist|ActionTypeAddTodolist|ActionTypeChangeTitle|ActionTypeChangeFilter

export type ActionTypeRemoveTodolist={
    type:'REMOVE-TODOLIST'
    id:string
}
export type ActionTypeAddTodolist={
    type:'ADD-TODOLIST'
    title:string
    todolistId:string
}
export type ActionTypeChangeTitle={
    type:'CHANGE-TODOLIST-TITLE'
    id:string
    title:string
}
export type ActionTypeChangeFilter={
    type:'CHANGE-TODOLIST-FILTER'
    id:string
    filter:filterType
}
export const todolist1 = v1()
export const todolist2 = v1()

const initialState:Array<TodolistType>=[]

export const todolistsReducer = (state: Array<TodolistType>=initialState, action: ActionType): Array<TodolistType> => {

    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.id)
        }

        case 'ADD-TODOLIST': {
            return [ {id:action.todolistId, title: action.title, filter: "all"},...state]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            let newState = state.find(el => el.id === action.id)
            if (newState) {
                newState.title = action.title

            }
            return [...state]
        }
        case'CHANGE-TODOLIST-FILTER':{
            let newState = state.find(el => el.id === action.id)
            if (newState) {
                newState.filter = action.filter

            }
            return [...state]
        }


        default:
            return state
    }
};

export const removeTodolistAC=(todolistId:string):ActionTypeRemoveTodolist=>{
return{
    type:'REMOVE-TODOLIST',
    id:todolistId
}}
export const addTodolistAC=(newTodolistTitle:string):ActionTypeAddTodolist=>{
    return{
        type:'ADD-TODOLIST',
        title:newTodolistTitle,
        todolistId:v1()
    }}
export const changeTitleTodoAC=(todolistId:string,newTodolistTitle:string):ActionTypeChangeTitle=>{
    return {
        type:'CHANGE-TODOLIST-TITLE',
        id:todolistId,
        title:newTodolistTitle
    }}
export const changeFilterTodoAC=(filter:filterType,todolistId:string):ActionTypeChangeFilter=>{
    return {
        type:'CHANGE-TODOLIST-FILTER',
        id:todolistId,
        filter:filter
    }}