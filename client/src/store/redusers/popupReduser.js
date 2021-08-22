import {POPUP_TOGGLE} from '../actions/popupActions'

const initialState = {
    display: 'none'
}

const reduser = (state = initialState, action) => {
    switch (action.type) {
        case POPUP_TOGGLE:
            return {...state, display: action.payload}
        default:
            return state
    }
}

export default reduser