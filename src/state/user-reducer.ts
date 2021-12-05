type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            let newstate = {...state}
            newstate.age = state.age + 1;
            return newstate;
        case 'INCREMENT-CHILDREN-COUNT':
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            }
        // let newstatecount={...state}
        // newstatecount.childrenCount = state.childrenCount + 1;
        // return newstatecount;
        case 'CHANGE-NAME':
            return {...state,name:action.newName}
        default:
            throw new Error("I don't understand this type")
    }
}