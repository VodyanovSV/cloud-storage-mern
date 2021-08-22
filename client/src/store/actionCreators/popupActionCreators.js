import {POPUP_TOGGLE} from '../actions/popupActions'

export const popupToggleActionCreator = (display) => ({
    type: POPUP_TOGGLE,
    payload: display
})