import {TaskStateType, TodolistType} from "../App";
import {addTodolistAC, todolistsReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";

test("ids should be equals", () => {

    const startTaskState: TaskStateType = {}
    const startTodoState: Array<TodolistType> = []

    const action = addTodolistAC("new todo")

    const endTaskState = tasksReducer(startTaskState, action)
    const endTodoState = todolistsReducer(startTodoState, action)

    const keys = Object.keys(endTaskState)
    const idFromTask = keys[0]
    const idFromTodolist = endTodoState[0].id

    expect(idFromTask).toBe(action.todolistId)
    expect(idFromTodolist).toEqual(action.todolistId)

})