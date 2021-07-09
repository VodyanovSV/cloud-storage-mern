import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from "redux-thunk";

const rootReduser = combineReducers({

})

const store = createStore(rootReduser, composeWithDevTools(applyMiddleware(thunk)))

export default store