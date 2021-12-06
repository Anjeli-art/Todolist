import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {Additemform} from "./Additemform";
import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import {
    addTodolistAC,
    changeFilterTodoAC,
    changeTitleTodoAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolist-reducer";
import {addTaskAC, changedTaskStatusAC, changedTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


export type filterType = "all" | "active" | "completed"
export type TodolistType = { id: string, title: string, filter: filterType }
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithReducers() {
    let todolist1 = v1()
    let todolist2 = v1()

    let [todolist, dispatchTodolist] = useReducer(todolistsReducer, [
        {id: todolist1, title: "what to learn", filter: "all"}, {
            id: todolist2, title: "what to bye", filter: "active"
        }])

    let [tasks, dispatchTask] = useReducer(tasksReducer,
        {
            [todolist1]: [{id: v1(), title: "html", isDone: true},
                {id: v1(), title: "css", isDone: true},
                {id: v1(), title: "js", isDone: false},
                {id: v1(), title: "restAPI", isDone: true},
                {id: v1(), title: "graphQL", isDone: false}],

            [todolist2]:
                [{id: v1(), title: "book", isDone: true},
                    {id: v1(), title: "milk", isDone: true},]
        })


    let removeTodo = (todolistid: string) => {
        const action = removeTodolistAC(todolistid)
        dispatchTodolist(action)
        dispatchTask(action)
    }
    const titleTodoStatus = (todolistid: string, Newvalue: string) => {
        const action = changeTitleTodoAC(todolistid, Newvalue)
        dispatchTodolist(action)
    }

    let addTodo = (title: string) => {
        const action = addTodolistAC(title)
        dispatchTodolist(action)
        dispatchTask(action)
    }
    let TodoChanged = (value: filterType, todolistid: string) => {
        const action = changeFilterTodoAC(value,todolistid)
        dispatchTodolist(action)
    }

    let removeTask = (idTask: string, todolistid: string) => {
        const action = removeTaskAC(idTask, todolistid)
        dispatchTask(action)
    }

    let addTask = (title: string, todolistid: string) => {
        const action = addTaskAC(title, todolistid)
        dispatchTask(action)
    }


    let changeStatus = (idTask: string, isDone: boolean, todolistid: string) => {
        const action = changedTaskStatusAC(idTask, isDone, todolistid)
        dispatchTask(action)
    }
    let changeTaskTitle = (id: string, Newvalue: string, todolistid: string) => {
        const action = changedTaskTitleAC(id, Newvalue, todolistid)
        dispatchTask(action)
    }


    // let changeTaskTitle = (id: string, Newvalue:string, todolistid: string) => { //моя функция
    //     const tasksobj = tasks[todolistid]
    //     let newTask = tasksobj.map(el => el.id === id ? {...el,title:Newvalue}: el)
    //     tasks[todolistid]=newTask
    //     Settask({...tasks})
    // }

    // const titleTodoStatus = (todolistid: string, Newvalue: string) => {
    //     const todo = todolist.map(el => el.id === todolistid ? {...el, title: Newvalue} : el)
    //     setTodolist(todo)
    // }

    return (
        <Box>
            <AppBar position="static" style={{backgroundColor: "#ffca28", padding: "20px"}}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h2" style={{margin: "0px 40px 0px 40px"}}>
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container style={{marginTop: "20px"}}>
                <Grid container style={{padding: "20px"}}>
                    <Additemform callback={addTodo}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolist.map(el => {
                        let taskfortodolist = tasks[el.id]

                        if (el.filter === "completed") {
                            taskfortodolist = taskfortodolist.filter(el => el.isDone)
                        }
                        if (el.filter === "active") {
                            taskfortodolist = taskfortodolist.filter(el => !el.isDone)
                        }
                        return <Grid item>
                            <Todolist title={el.title}
                                      key={el.id}
                                      todolistid={el.id}
                                      // tasks={taskfortodolist}
                                      // removeTask={removeTask}
                                      TodoChanged={TodoChanged}
                                      // addTask={addTask}
                                      // changeStatus={changeStatus}
                                      filter={el.filter}
                                      removeTodo={removeTodo}
                                      // changeTaskTitle={changeTaskTitle}
                                      titleTodoStatus={titleTodoStatus}
                            />
                        </Grid>
                    })}</Grid>
            </Container>
        </Box>)
}
