import {setAppErrorAC} from "../app/app-reducer";
import {Dispatch} from "redux";


export const handleServerNetworkError = (e:any,dispatch:Dispatch) :void=> {
    if (e.name === "SyntaxError") {
        dispatch(setAppErrorAC(e.message))
    }
    if (e.message === 'Network Error') {
        dispatch(setAppErrorAC("no connection!"))
    } else {
        dispatch(setAppErrorAC("something error"))
    }
} /////////////////     ///////////////////////////////////////////////////////////////////////////error question
////можно ли делать такой проброс ошибки,если да то можно ли записать в синтаксис ошибку,если да как заставить эту функцию работать