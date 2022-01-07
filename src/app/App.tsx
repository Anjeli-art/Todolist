import React, {useCallback, useEffect,} from 'react';
import './App.css';
import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import {
    addTodoTС,
    changeFilterTodoAC,
    changeTodoTС,
    filterType,
    removeTodoTС,
    setTodoTС,
    TodolistsTypeEntity,
} from "../features/TodolistsList/todolist-reducer";

import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "./store";
import {TasksType} from "../API/todolistAPI";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {Todolist} from "../features/TodolistsList/Todolist/Todolist";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";


export type TaskStateType = {
    [key: string]: Array<TasksType>
}

export const App: React.FC = () => {

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
                <TodolistsList/>
            </Container>
        </Box>)
}



export default App;