import {HIDE_LOADER, SHOW_LOADER} from "../actions/appActions";

const initialState = {
    loaderIsVisible: false
}

const reduser = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return {...state, loaderIsVisible: true}
        case HIDE_LOADER:
            return {...state, loaderIsVisible: false}
        default:
            return state
    }
}

export default reduser