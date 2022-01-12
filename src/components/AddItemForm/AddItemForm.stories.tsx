import React from "react"
import {action} from "@storybook/addon-actions";
import {AddItemForm} from "./AddItemForm";


export default {
    title: 'addItemForm stories',
    component: AddItemForm
}

const callback=action("Button 'add' was pressed inside the form")

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm callback={callback}/>
}

export const AddItemFormDisabledExample = (props: any) => {
    return <AddItemForm callback={callback} disabled={true}/>
}
