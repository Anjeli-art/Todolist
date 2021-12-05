import {TaskStateType} from "../App";
import {v1} from "uuid";
import {ActionTypeAddTodolist} from "./todolist-reducer";


type ActionType = ActionTypeRemoveTaskAC
    | ActionTypeAddTaskAC
    | ActionTypeChangedTaskStatusAC
    | ActionTypeChangedTaskTitleAC
    | ActionTypeAddTodolist

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
    isDone: boolean
    todolistId: string
    taskid: string
}

export type ActionTypeChangedTaskTitleAC = {
    type: 'CHANGE-TASK-TITLE',
    title: string,
    taskid: string,
    todolistId: string,
}

export const taskReducer = (state: TaskStateType, action: ActionType): TaskStateType => {

    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const task = state[action.todolistId]
            const filteredTask = task.filter(t => t.id !== action.id)
            stateCopy[action.todolistId] = filteredTask
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = {id: v1(), title: action.title, isDone: false}
            const tasks = stateCopy[action.todolistId]
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newStatusTasks = tasks.find(t => t.id === action.taskid)
            if (newStatusTasks) {
                newStatusTasks.isDone = action.isDone
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newStatusTasks = tasks.find(t => t.id === action.taskid)
            if (newStatusTasks) {
                newStatusTasks.title = action.title
            }
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[v1()] =[]
            return stateCopy
        }
        default:
            throw new Error("I don't understand this type")
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
export const changedTaskStatusAC = (taskid: string, Done: boolean, todolistId: string): ActionTypeChangedTaskStatusAC => {
    return {
        type: 'CHANGE-TASK-STATUS',
        isDone: Done,
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