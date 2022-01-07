import {PriorytiesTask, taskApi, TasksStatuses, TasksType, UpdateTask} from "../../API/todolistAPI";
import {AppRootType, AppThunk} from "../../app/store";
import {TypeForTasksAction} from "./todolist-reducer";


export type ActionTypeTasks =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changedTaskAC>
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

        case 'CHANGE-TASK':
        return {...state,[action.todolistId]:state[action.todolistId].map(t => t.id === action.taskid ? {...t,...action.model} : t)}

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

export const changedTaskAC = (taskid: string, model:UpdateTaskForThunk , todolistId: string) => ({
    type: 'CHANGE-TASK',
    model,
    taskid,
    todolistId,
}) as const


export const setTaskAC = (tasksArray: Array<TasksType>, todolistId: string) => ({
    type: "SET-TASKS",
    tasks: tasksArray,
    todolistId
}) as const


export const setTasksTC = (todolistId: string):AppThunk => (dispatch) => {
    taskApi.getTask(todolistId)
        .then((res) => {
            dispatch(setTaskAC(res.data.items, todolistId))
        })

}

export const deleteTasksTC = (todolistId: string, taskid: string):AppThunk => (dispatch) => {
    taskApi.deleteTask(todolistId, taskid)
        .then((res) => {
            dispatch(removeTaskAC(todolistId, taskid))
        })

}

export const addTasksTC = (title: string, todolistId: string):AppThunk => (dispatch) => {
    taskApi.createTask(title, todolistId)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })

}

export type UpdateTaskForThunk = {
    title?: string
    description?: string
    status?: TasksStatuses
    priority?: PriorytiesTask
    startDate?: string
    deadline?: string
}
export const updateTasksTC = (taskId: string, todolistId: string, model:UpdateTaskForThunk):AppThunk =>
    (dispatch, getState: () => AppRootType) => {
        const tasks = getState().tasks[todolistId]
        const currentTask = tasks.find(t => {
            return t.id === taskId
        })
        if (currentTask) {
            const apiModel: UpdateTask = {
                title: currentTask.title,
                status:currentTask.status,
                description: currentTask.description,
                priority: currentTask.priority,
                startDate: currentTask.startDate,
                deadline: currentTask.deadline,
                    ...model
            }


            taskApi.updateTask(apiModel, todolistId, taskId)
                .then((res) => {
                    dispatch(changedTaskAC(taskId,model , todolistId))

                })

        }
    }

