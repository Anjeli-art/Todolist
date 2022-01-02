import {v1} from "uuid";
import {ActionTypeAddTodolist, ActionTypeRemoveTodolist, ActionTypeSetTodos} from "./todolist-reducer";
import {PriorytiesTask, TasksStatuses, TasksType} from "../API/todolistAPI";


type ActionType = ActionTypeRemoveTaskAC
    | ActionTypeAddTaskAC
    | ActionTypeChangedTaskStatusAC
    | ActionTypeChangedTaskTitleAC
    | ActionTypeAddTodolist
    | ActionTypeRemoveTodolist
    | ActionTypeSetTodos

export type ActionTypeRemoveTaskAC = {
    type: 'REMOVE-TASK'
    id: string
    todolistId: string
}
export type ActionTypeAddTaskAC = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type ActionTypeChangedTaskStatusAC = {
    type: 'CHANGE-TASK-STATUS'
    status: TasksStatuses
    todolistId: string
    taskid: string
}

export type ActionTypeChangedTaskTitleAC = {
    type: 'CHANGE-TASK-TITLE',
    title: string,
    taskid: string,
    todolistId: string,
}
export type TaskStateType = {
    [key: string]: Array<TasksType>
}

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {

    switch (action.type) {
        case "SET-TODO":
            let copyState={...state}
            action.todos.forEach((t)=>{
                copyState[t.id]=[]
            })
            return copyState
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const task = state[action.todolistId]
            const filteredTask = task.filter(t => t.id !== action.id)
            stateCopy[action.todolistId] = filteredTask
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = {
                description: "",
                title: action.title,
                status: TasksStatuses.New,
                priority: PriorytiesTask.Low,
                startDate: "",
                deadline: "",
                id: v1(),
                todoListId: action.todolistId,
                order: 0,
                addedDate: ""
            }
            const tasks = stateCopy[action.todolistId]
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskid ? {...t, status: action.status} : t)
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskid ? {...t, title: action.title} : t)
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
};

export const removeTaskAC = (taskid: string, todolistId: string): ActionTypeRemoveTaskAC => {
    return {
        type: 'REMOVE-TASK',
        id: taskid,
        todolistId: todolistId,
    }
}
export const addTaskAC = (newTaskTitle: string, todolistId: string): ActionTypeAddTaskAC => {
    return {
        type: 'ADD-TASK',
        title: newTaskTitle,
        todolistId: todolistId,
    }
}
export const changedTaskStatusAC = (taskid: string, status: TasksStatuses, todolistId: string): ActionTypeChangedTaskStatusAC => {
    return {
        type: 'CHANGE-TASK-STATUS',
        status: status,
        taskid: taskid,
        todolistId: todolistId,
    }
}
export const changedTaskTitleAC = (taskid: string, newTitle: string, todolistId: string): ActionTypeChangedTaskTitleAC => {
    return {
        type: 'CHANGE-TASK-TITLE',
        title: newTitle,
        taskid: taskid,
        todolistId: todolistId,
    }
}