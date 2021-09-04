import React, {ChangeEvent, useState} from "react";

export type EditablespanType = {
    title: string
    onChange:(Newvalue:string)=>void
}

export function Editablespan(props: EditablespanType) {

    let [editmode, seteditmode] = useState(false)
    let [title, setTitle] = useState("")

    const activaiteEditMode = () => {seteditmode(true);setTitle(props.title)}
    const activaiteViewMode = () => {seteditmode(false);props.onChange(title)}
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editmode ? <input value={title} onChange={onChangeHandler} onBlur={activaiteViewMode} autoFocus/>
            : <span onDoubleClick={activaiteEditMode}>{props.title}</span>
    )

}