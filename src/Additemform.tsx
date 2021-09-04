import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type AdditemformPropsType = {
    callback:(title: string)=>void
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
            debugger
            props.callback(title.trim())
            setTitle("")
        } else {
            setError("title is required")
        }
    }
    return (

        <div>
            <input value={title} onChange={inputHandlerCnange} onKeyPress={onEnterHandler}
                   className={error ? "error" : ""}/>
            <button onClick={addTask}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>

    );
};

