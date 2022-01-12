import {appReducer, InitialAppStateType, setErrorAC, setStatusAC} from "./app-reducer";

let startState: InitialAppStateType

beforeEach(() => {
    startState = {
        status: "idle",
        error: null
    }
})

test("status will be changed", () => {

    const action = setStatusAC("success")

    const endState = appReducer(startState, action)

    expect(endState.status).toBe("success")
    expect(endState.error).toBe(null)
    expect(startState !== endState).toBeTruthy()


})
test("error will be set", () => {

    const action = setErrorAC("some error")

    const endState = appReducer(startState, action)

    expect(endState.status).toBe("idle")
    expect(endState.error).toBe("some error")
    expect(startState !== endState).toBeTruthy()


})


