import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from "redux-thunk";
import userReduser from './redusers/userReduser.js'
import fileReduser from './redusers/fileReduser.js'
import popupReduser from "./redusers/popupReduser";
import uploaderReduser from "./redusers/uploaderReduser";
import appReduser from "./redusers/appReduser";

const rootReduser = combineReducers({
	userReduser,
    fileReduser,
    popupReduser,
	uploaderReduser,
    appReduser
})

const store = createStore(rootReduser, composeWithDevTools(applyMiddleware(thunk)))

export default store