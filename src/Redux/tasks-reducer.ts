import {taskApi, TasksStatuses, TasksType, UpdateTask} from "../API/todolistAPI";
import {Dispatch} from "redux";
import {AppRootType} from "./store";
import {TypeForTasksAction} from "./todolist-reducer";


type ActionTypeTasks =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changedTaskStatusAC>
    | ReturnType<typeof changedTaskTitleAC>
    | ReturnType<typeof setTaskAC>
    | TypeForTasksAction

export type TaskStateType = {
    [key: string]: Array<TasksType>
}

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionTypeTasks): TaskStateType => {

    switch (action.type) {
        case "SET-TODO":
            let copyState = {...state}
            action.todos.forEach((t) => {
                copyState[t.id] = []
            })
            return copyState
        case 'REMOVE-TASK':
        return {...state,[action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)}

        case 'ADD-TASK':
            return {...state,[action.task.todoListId]:[action.task, ...state[action.task.todoListId]]}

        case 'CHANGE-TASK-STATUS':
        return {...state,[action.todolistId]:state[action.todolistId].map(t => t.id === action.taskid ? {...t, status: action.status} : t)}

        case 'CHANGE-TASK-TITLE':
            return {...state,[action.todolistId]:state[action.todolistId].map(t => t.id === action.taskid ? {...t, title: action.title} : t)}

        case 'ADD-TODOLIST':
        return {...state,[action.todolist.id]:[]}

        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TASKS":
            return {...state,[action.todolistId] : action.tasks}


        default:
            return state
    }
};

export const removeTaskAC = (todolistId: string, id: string) => ({
    type: 'REMOVE-TASK',
    id,
    todolistId,
}) as const

export const addTaskAC = (task: TasksType) => ({
    type: 'ADD-TASK',
    task
}) as const

export const changedTaskStatusAC = (taskid: string, status: TasksStatuses, todolistId: string) => ({
    type: 'CHANGE-TASK-STATUS',
    status,
    taskid,
    todolistId,
}) as const

export const changedTaskTitleAC = (taskid: string, newTitle: string, todolistId: string) => ({
    type: 'CHANGE-TASK-TITLE',
    title: newTitle,
    taskid,
    todolistId,
}) as const


export const setTaskAC = (tasksArray: Array<TasksType>, todolistId: string) => ({
    type: "SET-TASKS",
    tasks: tasksArray,
    todolistId
}) as const


export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    taskApi.getTask(todolistId)
        .then((res) => {
            dispatch(setTaskAC(res.data.items, todolistId))
        })

}

export const deleteTasksTC = (todolistId: string, taskid: string) => (dispatch: Dispatch) => {
    taskApi.deleteTask(todolistId, taskid)
        .then((res) => {
            dispatch(removeTaskAC(todolistId, taskid))
        })

}

export const addTasksTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    taskApi.createTask(title, todolistId)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })

}

export const updateTasksStatusTC = (taskId: string, todolistId: string, status: TasksStatuses) =>
    (dispatch: Dispatch, getState: () => AppRootType) => {
        const tasks = getState().tasks[todolistId]
        const currentTask = tasks.find(t => {
            return t.id === taskId
        })
        if (currentTask) {
            const model: UpdateTask = {
                title: currentTask.title,
                status,
                description: currentTask.description,
                priority: currentTask.priority,
                startDate: currentTask.startDate,
                deadline: currentTask.deadline
            }


            taskApi.updateTask(model, todolistId, taskId)
                .then((res) => {
                    dispatch(changedTaskStatusAC(taskId, status, todolistId))

                })

        }
    }

export const updateTasksTitleTC = (taskId: string, todolistId: string, title: string) =>
    (dispatch: Dispatch, getState: () => AppRootType) => {
        const tasks = getState().tasks[todolistId]
        const currentTask = tasks.find(t => {
            return t.id === taskId
        })
        if (currentTask) {
            const model: UpdateTask = {
                title: title,
                status: currentTask.status,
                description: currentTask.description,
                priority: currentTask.priority,
                startDate: currentTask.startDate,
                deadline: currentTask.deadline
            }


            taskApi.updateTask(model, todolistId, taskId)
                .then((res) => {
                    dispatch(changedTaskTitleAC(taskId, title, todolistId))

                })

        }
    }