import {LOGIN, LOGOUT} from '../actions/userActions.js'

export const loginUserActionCreator = (user) => ({
    type: LOGIN,
    payload: user
})

export const logoutUserActionCreator = () => ({
    type: LOGOUT
})