import React, {ChangeEvent, useState} from "react";
import {Input} from "@material-ui/core";

export type EditablespanType = {
    title: string
    onChange:(Newvalue:string)=>void
}

export const EditableSpan=React.memo((props: EditablespanType)=> {

    let [editmode, seteditmode] = useState(false)
    let [title, setTitle] = useState("")

    const activaiteEditMode = () => {seteditmode(true);setTitle(props.title)}
    const activaiteViewMode = () => {seteditmode(false);props.onChange(title)}
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editmode ? <Input value={title} onChange={onChangeHandler} onBlur={activaiteViewMode} autoFocus/>
            : <span onDoubleClick={activaiteEditMode}>{props.title}</span>
    )

})