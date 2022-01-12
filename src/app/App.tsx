import React from 'react';
import './App.css';

import MenuIcon from '@material-ui/icons/Menu'
import {TasksType} from "../API/todolistAPI";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {LinearDeterminate} from "../components/LinearProgress/LinearProgress";
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {useSelector} from "react-redux";
import {AppRootType} from "./store";
import {StatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackBar/SnackBar";

type PropsType={
    demo?:boolean
}

export type TaskStateType = {
    [key: string]: Array<TasksType>
}

export const App: React.FC<PropsType> = ({demo=false}) => {

    const status = useSelector<AppRootType, StatusType>(state => state.app.status)
    return (
        <Box>
            <Box style={{height: "4px"}}>
                {status === "loading" && <LinearDeterminate/>}
            </Box>
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
                <TodolistsList demo={demo}/>
            </Container>
            <ErrorSnackbar/>
        </Box>)
}


export default App;