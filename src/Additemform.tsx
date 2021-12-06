import {Button, createMuiTheme, Input, TextField} from '@material-ui/core';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';



export type AdditemformPropsType = {
    callback: (title: string) => void
}

export const Additemform = (props: AdditemformPropsType) => {

    let [title, setTitle] = useState("")
    const inputHandlerCnange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.callback(title.trim())
            setTitle("")
        } else {
            setError("title is required")
        }
    }


    return (

        <div>
            <TextField variant={"outlined"} value={title} onChange={inputHandlerCnange} onKeyPress={onEnterHandler}
                       label={"Type value"} error={!!error} helperText={error}/>
            <Button onClick={addTask} variant={"contained"} color={"primary"}
                    style={{backgroundColor: "#ffca28", fontSize: "10px", padding: "18px 0px 18px 0px"}}>+</Button>

        </div>

    );
};



