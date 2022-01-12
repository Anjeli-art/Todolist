import {todolistApi, TodolistsType} from "../../API/todolistAPI";
import {AppThunk} from "../../app/store";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";

export type TypeForTasksAction =
    ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodosAC>

export type ActionTypeTodolists =
    | ReturnType<typeof changeTitleTodoAC>
    | ReturnType<typeof changeFilterTodoAC>
    | TypeForTasksAction
    | ReturnType<typeof changeEntityStatusTodoAC>


export type filterType = "all" | "active" | "completed"
export type EntityStatusType = "idle" | "sucsses" | "loading" | "failed"
export type TodolistsTypeEntity = TodolistsType & { filter: filterType ,entityStatus:EntityStatusType}

const initialState: Array<TodolistsTypeEntity> = []

export const todolistsReducer = (state: Array<TodolistsTypeEntity> = initialState, action: ActionTypeTodolists): Array<TodolistsTypeEntity> => {

    switch (action.type) {
        case 'TODO/REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.id)

        case 'TODO/ADD-TODOLIST':
            return [{...action.todolist, filter: "all",entityStatus:"idle"}, ...state]

        case 'TODO/CHANGE-TODOLIST-TITLE':
            return state.map(todo => todo.id === action.id ? {...todo, title: action.title} : todo)

        case'TODO/CHANGE-TODOLIST-FILTER':
            return state.map(todo => todo.id === action.id ? {...todo, filter: action.filter} : todo)

        case'TODO/CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(todo => todo.id === action.id ? {...todo,entityStatus:action.entityStatus } : todo)

        case"TODO/SET-TODO":
            return action.todos.map(todo => {
                return {...todo, filter: "all",entityStatus:"idle"}
            })

        default:
            return state
    }
};

export const removeTodolistAC = (id: string) => ({
    type: 'TODO/REMOVE-TODOLIST',
    id
}) as const

export const addTodolistAC = (todolist: TodolistsType) => ({
    type: 'TODO/ADD-TODOLIST',
    todolist
}) as const

export const changeTitleTodoAC = (id: string, newTodolistTitle: string) => ({
    type: 'TODO/CHANGE-TODOLIST-TITLE',
    id,
    title: newTodolistTitle
}) as const

export const changeFilterTodoAC = (filter: filterType, id: string) => ({
    type: 'TODO/CHANGE-TODOLIST-FILTER',
    id,
    filter
}) as const

export const changeEntityStatusTodoAC = (entityStatus:EntityStatusType, id: string) => ({
    type: 'TODO/CHANGE-TODOLIST-ENTITY-STATUS',
    id,
    entityStatus
}) as const


export const setTodosAC = (todosArray: Array<TodolistsType>) => ({
    type: "TODO/SET-TODO",
    todos: todosArray
}) as const


export enum ServerResponseResultCode{
    success=0,
    error=1,
    captcha=10
}

export const setTodoTС = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await todolistApi.getTodolists()
        dispatch(setTodosAC(res.data))
    } catch (e: any) {
        if (e.message === 'Network Error') {
            dispatch(setAppErrorAC("no connection!"))
        } else {
            dispatch(setAppErrorAC("something error"))
        }
    } finally {
        dispatch(setAppStatusAC("success"))
    }
}

export const removeTodoTС = (todolistId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeEntityStatusTodoAC("loading",todolistId))
    try {
        const res = await todolistApi.deleteTodolist(todolistId)
        if (res.data.resultCode !== ServerResponseResultCode.success) {
            throw new SyntaxError(res.data.messages[0])
        }
        dispatch(removeTodolistAC(todolistId))
    } catch (e: any) {
        if (e.name === "SyntaxError") {
            dispatch(setAppErrorAC(e.message))
        } else if (e.message === 'Network Error') {
            dispatch(setAppErrorAC("no connection!"))
        } else {
            dispatch(setAppErrorAC("something error"))
        }
    } finally {
        dispatch(setAppStatusAC("success"))
    }
}

export const addTodoTС = (title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await todolistApi.createTodolist(title)
        if (res.data.resultCode !== ServerResponseResultCode.success) {
            throw new SyntaxError(res.data.messages[0])
        }
        dispatch(addTodolistAC(res.data.data.item))
    } catch (e: any) {
        if (e.name === "SyntaxError") {
            dispatch(setAppErrorAC(e.message))
        } else if (e.message === 'Network Error') {
            dispatch(setAppErrorAC("no connection!"))
        } else {
            dispatch(setAppErrorAC("something error"))
        }
    } finally {
        dispatch(setAppStatusAC("success"))
    }
}

export const changeTodoTС = (todolistId: string, title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await todolistApi.updateTodolistTitle({todolistId, title})
        if (res.data.resultCode !== ServerResponseResultCode.success) {
            throw new SyntaxError(res.data.messages[0])
        }
        dispatch(changeTitleTodoAC(todolistId, title))
    } catch (e:any) {
        if (e.name === "SyntaxError") {
            dispatch(setAppErrorAC(e.message))
        } else if (e.message === 'Network Error') {
            dispatch(setAppErrorAC("no connection!"))
        } else {
            dispatch(setAppErrorAC("something error"))
        }
    } finally {
        dispatch(setAppStatusAC("success"))
    }
}