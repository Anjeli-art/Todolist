import React from "react"
import {action} from "@storybook/addon-actions";
import { EditableSpan } from "./EditableSpan";


export default {
    title: 'EditableSpan stories',
    component: EditableSpan
}

const callback=action("value changed")

export const EditableSpanBaseExample = (props: any) => {
    return <EditableSpan title={"title"} onChange={callback}/>
}

export const EditableSpanDisabledExample = (props: any) => {
    return <EditableSpan title={"title"} onChange={callback} disabled={true}/>
}