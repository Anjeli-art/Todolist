import {setAppErrorAC} from "../app/app-reducer";
import {Dispatch} from "redux";


export const handleServerNetworkError = (e:any,dispatch:Dispatch) :void=> {
    console.log(e.name)
    console.log(e)
    if (e.name === "SyntaxError") {
        console.log("1111111111")
        dispatch(setAppErrorAC(e.message))
    }
    if (e.message === 'Network Error') {
        console.log("qqqqqqqqqqqqqqqq")
        dispatch(setAppErrorAC("no connection!"))
    } else {
        console.log("333333333333333333333")
        dispatch(setAppErrorAC("something error"))
    }
}
