import {loginUserActionCreator} from "../store/actionCreators/userActionCreators";

export const uploadAvatar = (file) => {
    return async (dispatch) => {
        try {

            const url = '/api/files/avatar'
            const method = 'POST'
            const headers = {authorization: `Bearer ${localStorage.getItem('token')}`}
            const body = new FormData()
            body.append('file', file)

            const response = await fetch(url, {method, body, headers})
            const user = await response.json()

            dispatch(loginUserActionCreator(user))

        } catch (e) {
            alert(e.message)
        }
    }
}

export const deleteAvatar = () => {
    return async (dispatch) => {
        try {
            const url = '/api/files/avatar'
            const method = 'DELETE'
            const headers = {authorization: `Bearer ${localStorage.getItem('token')}`}

            const response = await fetch(url, {method, headers})
            const user = await response.json()

            dispatch(loginUserActionCreator(user))

        } catch (e) {
            alert(e.message)
        }
    }
}
