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
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "./state/store";


export type filterType = "all" | "active" | "completed"
export type TodolistType = { id: string, title: string, filter: filterType }
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootType, Array<TodolistType>>(state => state.todolists)


    const removeTodo = (todolistid: string) => {
        dispatch(removeTodolistAC(todolistid))

    }
    const titleTodoStatus = (todolistid: string, Newvalue: string) => {
        dispatch(changeTitleTodoAC(todolistid, Newvalue))
    }

    const addTodo = (title: string) => {
        dispatch(addTodolistAC(title))
    }
    const TodoChanged = (value: filterType, todolistid: string) => {
        dispatch(changeFilterTodoAC(value, todolistid))
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
                    {todolists.map(el => {
                        return <Grid item>
                            <Todolist title={el.title}
                                      key={el.id}
                                      todolistid={el.id}
                                      TodoChanged={TodoChanged}
                                      filter={el.filter}
                                      removeTodo={removeTodo}
                                      titleTodoStatus={titleTodoStatus}
                            />
                        </Grid>
                    })}</Grid>
            </Container>
        </Box>)
}
