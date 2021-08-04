import {HIDE_LOADER, SHOW_LOADER} from "../actions/appActions";

export const showActionCreator = () => ({
    type: SHOW_LOADER
})

export const hideActionCreator = () => ({
        type: HIDE_LOADER
})