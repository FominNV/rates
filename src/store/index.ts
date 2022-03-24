import { combineReducers, createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "@redux-devtools/extension"
import { rateReducer } from "./rate/reducer"

export type RootState = ReturnType<typeof combinedReducer>

const combinedReducer = combineReducers({
  rate: rateReducer
})

const composeEnhancers = composeWithDevTools({})

export const store = createStore(combinedReducer, {}, composeEnhancers(applyMiddleware(thunk)))
