import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    let task = [{id: 1, title: "html", isDone: true},
        {id: 2, title: "html", isDone: true},
        {id: 3, title: "html", isDone: true}]


    return (
        <div className="App">
            <Todolist title={"what to learn"} task={task}/>
        </div>

    );
}

export default App;
