import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Component/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Component/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'


export type filterType = "all" | "active" | "completed"
export type TodolistType = { id: string, title: string, filter: filterType }
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolist1 = v1()
    let todolist2 = v1()

    let [todolist, setTodolist] = useState<Array<TodolistType>>([
            {id: todolist1, title: "what to learn", filter: "all"}, {
                id: todolist2, title: "what to bye", filter: "active"
            }])

    let [tasks, Settask] = useState<TaskStateType>(
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
        setTodolist(todolist.filter(el => el.id !== todolistid))
        delete tasks[todolistid]
        Settask({...tasks})
    }
    const titleTodoStatus = (todolistid: string, Newvalue: string) => {
        const todo = todolist.find(el => el.id === todolistid)
        if (todo) {
            todo.title = Newvalue
        }
        setTodolist([...todolist])
    }
    let addTodo = (title: string) => {
        const todo: TodolistType = {id: v1(), title: title, filter: "all"}
        setTodolist([todo, ...todolist])
        Settask({[todo.id]: [], ...tasks})
    }
    let TodoChanged = (value: filterType, todolistid: string) => {
        let todolistNew = todolist.find(el => el.id === todolistid)
        if (todolistNew) {
            todolistNew.filter = value
            setTodolist([...todolist])
        }
    }

    let removeTask = (idTask: string, todolistid: string) => {
        let todotasks = tasks[todolistid]
        tasks[todolistid] = todotasks.filter(el => el.id !== idTask)
        Settask({...tasks})
    }

    let addTask = (title: string, todolistid: string) => {
        const task = {id: v1(), title: title, isDone: false}
        const tasksobj = tasks[todolistid]
        tasks[todolistid] = [task, ...tasksobj]
        Settask({...tasks})
    }


    let changeStatus = (idTask: string, isDone: boolean, todolistid: string) => {
        const tasksobj = tasks[todolistid]
        let newTask = tasksobj.find(el => el.id === idTask)
        if (newTask) {
            newTask.isDone = isDone
            Settask({...tasks})
        }
    }
    let changeTaskTitle = (id: string, Newvalue: string, todolistid: string) => {
        const tasksobj = tasks[todolistid]
        let newTask = tasksobj.find(el => el.id === id)
        if (newTask) {
            newTask.title = Newvalue
            Settask({...tasks})
        }
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
        <Box >
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

export default App;
