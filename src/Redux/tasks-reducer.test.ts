import {TaskStateType} from "../App";
import {addTaskAC, changedTaskStatusAC, changedTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolist-reducer";


test("correct task should be deleted from correct array", () => {

    const startState: TaskStateType = {
        "todolist1":
            [{id: "1", title: "html", isDone: true},
                {id: "2", title: "css", isDone: true},
                {id: "3", title: "js", isDone: false},
                {id: "4", title: "restAPI", isDone: true},
                {id: "5", title: "graphQL", isDone: false}],

        "todolist2":
            [{id: "1", title: "book", isDone: true},
                {id: "2", title: "milk", isDone: true},
                {id: "3", title: "milk", isDone: true},]
    }
    const action = removeTaskAC("2", "todolist2")
    const endState = tasksReducer(startState, action)

    expect(endState["todolist1"].length).toBe(5)
    expect(endState["todolist2"].length).toBe(2)
    expect(endState["todolist2"].every(t => t.id !== "2")).toBeTruthy()
})

test("correct task should be added from correct array", () => {

    const startState: TaskStateType = {
        "todolist1":
            [{id: "1", title: "html", isDone: true},
                {id: "2", title: "css", isDone: true},
                {id: "3", title: "js", isDone: false},
                {id: "4", title: "restAPI", isDone: true},
                {id: "5", title: "graphQL", isDone: false}],

        "todolist2":
            [{id: "1", title: "book", isDone: true},
                {id: "2", title: "milk", isDone: true},
                {id: "3", title: "milk", isDone: true},]
    }
    const action = addTaskAC("juice", "todolist2")
    const endState = tasksReducer(startState, action)

    expect(endState["todolist1"].length).toBe(5)
    expect(endState["todolist2"].length).toBe(4)
    expect(endState["todolist2"][0].id).toBeDefined()
    expect(endState["todolist2"][0].title).toBe("juice")
    expect(endState["todolist2"][0].isDone).toBe(false)
})

test("status of specified task should be changed", () => {

    const startState: TaskStateType = {
        "todolist1":
            [{id: "1", title: "html", isDone: true},
                {id: "2", title: "css", isDone: true},
                {id: "3", title: "js", isDone: false},
                {id: "4", title: "restAPI", isDone: true},
                {id: "5", title: "graphQL", isDone: false}],

        "todolist2":
            [{id: "1", title: "book", isDone: true},
                {id: "2", title: "milk", isDone: true},
                {id: "3", title: "milk", isDone: true},]
    }
    const action = changedTaskStatusAC("2", false, "todolist2")
    const endState = tasksReducer(startState, action)

    expect(endState["todolist1"][1].isDone).toBeTruthy()
    expect(endState["todolist2"][1].isDone).toBeFalsy()

})

test("title of specified task should be changed", () => {

    const startState: TaskStateType = {
        "todolist1":
            [{id: "1", title: "html", isDone: true},
                {id: "2", title: "css", isDone: true},
                {id: "3", title: "js", isDone: false},
                {id: "4", title: "restAPI", isDone: true},
                {id: "5", title: "graphQL", isDone: false}],

        "todolist2":
            [{id: "1", title: "book", isDone: true},
                {id: "2", title: "milk", isDone: true},
                {id: "3", title: "milk", isDone: true},]
    }
    const action = changedTaskTitleAC("2", "titleAC", "todolist2")
    const endState = tasksReducer(startState, action)

    expect(endState["todolist1"][1].title).toBe("css")
    expect(endState["todolist2"][1].title).toBe("titleAC")

})

test("new property with new array should be added when new todolist is added", () => {

    const startState: TaskStateType = {
        "todolist1":
            [{id: "1", title: "html", isDone: true},
                {id: "2", title: "css", isDone: true},
                {id: "3", title: "js", isDone: false},
                {id: "4", title: "restAPI", isDone: true},
                {id: "5", title: "graphQL", isDone: false}],

        "todolist2":
            [{id: "1", title: "book", isDone: true},
                {id: "2", title: "milk", isDone: true},
                {id: "3", title: "milk", isDone: true},]
    }
    const action = addTodolistAC("new todo")
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey=keys.find(k=>k !=="todolist1" && k !=="todolist2")
    if(!newKey){
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})
test("property with todolistid should be deleted", () => {

    const startState: TaskStateType = {
        "todolist1":
            [{id: "1", title: "html", isDone: true},
                {id: "2", title: "css", isDone: true},
                {id: "3", title: "js", isDone: false},
                {id: "4", title: "restAPI", isDone: true},
                {id: "5", title: "graphQL", isDone: false}],

        "todolist2":
            [{id: "1", title: "book", isDone: true},
                {id: "2", title: "milk", isDone: true},
                {id: "3", title: "milk", isDone: true},]
    }
    const action = removeTodolistAC( "todolist2")
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todolist2"]).toBeUndefined()

})