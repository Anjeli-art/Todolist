import {todolistApi, TodolistsType} from "../../API/todolistAPI";
import {AppThunk} from "../../app/store";

export type TypeForTasksAction =
    ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodosAC>

export type ActionTypeTodolists =
    | ReturnType<typeof changeTitleTodoAC>
    | ReturnType<typeof changeFilterTodoAC>
    | TypeForTasksAction

export type filterType = "all" | "active" | "completed"
export type TodolistsTypeEntity = TodolistsType & { filter: filterType }

const initialState: Array<TodolistsTypeEntity> = []

export const todolistsReducer = (state: Array<TodolistsTypeEntity> = initialState, action: ActionTypeTodolists): Array<TodolistsTypeEntity> => {

    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.id)

        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: "all"}, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todo => todo.id === action.id ? {...todo, title: action.title} : todo)

        case'CHANGE-TODOLIST-FILTER':
            return state.map(todo => todo.id === action.id ? {...todo, filter: action.filter} : todo)

        case"SET-TODO":
            return action.todos.map(todo => {
                return {...todo, filter: "all"}
            })

        default:
            return state
    }
};

export const removeTodolistAC = (id: string) => ({
    type: 'REMOVE-TODOLIST',
    id
}) as const

export const addTodolistAC = (todolist: TodolistsType) => ({
    type: 'ADD-TODOLIST',
    todolist
}) as const

export const changeTitleTodoAC = (id: string, newTodolistTitle: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title: newTodolistTitle
}) as const

export const changeFilterTodoAC = (filter: filterType, id: string) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
}) as const


export const setTodosAC = (todosArray: Array<TodolistsType>) => ({
    type: "SET-TODO",
    todos: todosArray
}) as const


export const setTodoTС = (): AppThunk => async dispatch => {
    try {
        const res = await todolistApi.getTodolists()
        dispatch(setTodosAC(res.data))
    } catch (e) {
        console.log(e)
    }
}

export const removeTodoTС = (todolistId: string): AppThunk => async dispatch => {
    try {
        await todolistApi.deleteTodolist(todolistId)
        dispatch(removeTodolistAC(todolistId))
    } catch (e) {
        console.log(e)
    }
}

export const addTodoTС = (title: string): AppThunk => async dispatch => {
    try {
        const res = await todolistApi.createTodolist(title)
        dispatch(addTodolistAC(res.data.data.item))
    } catch (e) {
        console.log(e)
    }
}
export const changeTodoTС = (todolistId: string, title: string): AppThunk => async dispatch => {
    try {
        await todolistApi.updateTodolistTitle({todolistId, title})
        dispatch(changeTitleTodoAC(todolistId, title))
    } catch (e) {
        console.log(e)
    }
}