import {addTodolistAC, todolistsReducer, TodolistsTypeEntity} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TaskStateType} from "../AppWithRedux";

test("ids should be equals", () => {

    const startTaskState: TaskStateType = {}
    const startTodoState: Array<TodolistsTypeEntity> = []

    const action = addTodolistAC({id: "todolist1", title: "what to learn", filter: "all", addedDate: "", order: 0})

    const endTaskState = tasksReducer(startTaskState, action)
    const endTodoState = todolistsReducer(startTodoState, action)

    const keys = Object.keys(endTaskState)
    const idFromTask = keys[0]
    const idFromTodolist = endTodoState[0].id

    expect(idFromTask).toBe(action.todolist.id)
    expect(idFromTodolist).toEqual(action.todolist.id)

})