import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from "redux-thunk";
import userReduser from './redusers/userReduser.js'

const rootReduser = combineReducers({
	userReduser,
})

const store = createStore(rootReduser, composeWithDevTools(applyMiddleware(thunk)))

export default store