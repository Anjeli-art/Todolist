import React, {useCallback, useEffect,} from 'react';
import './App.css';
import {Todolist} from "./Component/Todolist";
import {AddItemForm} from "./Component/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import {
    addTodoTС,
    changeFilterTodoAC,
    changeTitleTodoAC, changeTodoTС, filterType,
    removeTodoTС, setTodoTС, TodolistsTypeEntity,
} from "./Redux/todolist-reducer";

import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "./Redux/store";
import {TasksType} from "./API/todolistAPI";


export type TaskStateType = {
    [key: string]: Array<TasksType>
}

export const AppWithRedux: React.FC = () => {

    useEffect(() => {
        dispatch(setTodoTС())
    }, [])

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootType, Array<TodolistsTypeEntity>>(state => state.todolists)


    const removeTodo = useCallback((todolistid: string) => {
        dispatch(removeTodoTС(todolistid))

    }, [dispatch])
    const titleTodoStatus = useCallback((todolistid: string, Newvalue: string) => {
        dispatch(changeTodoTС(todolistid, Newvalue))
    }, [dispatch])

    const addTodo = useCallback((title: string) => {
        dispatch(addTodoTС(title))
    }, [dispatch])

    const TodoChanged = useCallback((value: filterType, todolistid: string) => {
        dispatch(changeFilterTodoAC(value, todolistid))
    }, [dispatch])

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
                    <AddItemForm callback={addTodo}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(el => {
                        return <Grid item key={el.id}>
                            <Todolist title={el.title}
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
