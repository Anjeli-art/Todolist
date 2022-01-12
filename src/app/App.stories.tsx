import React from "react"
import {App} from "./App";

import {ReduxStoreProviderDecorator} from "../../.storybook/ReduxStoreProviderDecorator";


export default {
    title: 'App stories',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}


export const AppBaseExample = () => {
    return <App demo={true}/>
}
