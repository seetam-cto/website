import {combineReducers} from "@reduxjs/toolkit"
import { settingsReducer } from "./settings"

// combine multiple reducers
const rootReducer = combineReducers({
    settings: settingsReducer
})

export default rootReducer