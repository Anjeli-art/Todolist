import React, {useCallback, useEffect} from "react";
import {
    addTodoTС, changeFilterTodoAC,
    changeTodoTС,
    filterType,
    removeTodoTС,
    setTodoTС,
    TodolistsTypeEntity
} from "./todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../app/store";
import {Grid} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

export const TodolistsList = () => {
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
        <>
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
        </>
    );
};