import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        "API-KEY": "7ccc0386-8558-4e56-b3f7-82cd09cd2d3e"
    }
})


export type TodolistsType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type CommonResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}

export enum TasksStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3

}

export enum PriorytiesTask{
    Low=0,
    Middle=1,
    Hi=2,
    Urgently=3,
    later=4

}


export type TasksType = {
    description: string
    title: string
    status: TasksStatuses
    priority: PriorytiesTask
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponse = {
    items: TasksType[]
    totalCount: number
    error: string | null

}
export type UpdateTask = {
    title: string
    description: string
    status: TasksStatuses
    priority: PriorytiesTask
    startDate: string
    deadline: string
}


export const todolistApi = {
    getTodolists() {
        return instance.get<Array<TodolistsType>>("/todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{ item: TodolistsType }>,
            AxiosResponse<CommonResponseType<{ item: TodolistsType }>>,
            { title: string }>("/todo-lists", {title})
    }
    ,
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}`)
    }
    ,
    updateTodolistTitle(params: { title: string, todolistId: string }) {
        return instance.put<CommonResponseType,
            AxiosResponse<CommonResponseType>,
            { title: string }>(`/todo-lists/${params.todolistId}`, {title: params.title})
    }
}

export const taskApi = {
    getTask(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(title: string, todolistId: string) {
        return instance.post<CommonResponseType<{item:TasksType}>>(`/todo-lists/${todolistId}/tasks`, {title})
    }
    ,
    deleteTask(todolistId: string, taskid: string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}/tasks/${taskid}`)
    }
    ,
    updateTask( model:UpdateTask, todolistId: string, taskid: string ) {
        return instance.put<CommonResponseType<{item:TasksType}>>(`/todo-lists/${todolistId}/tasks/${taskid}`, model)
    }
}