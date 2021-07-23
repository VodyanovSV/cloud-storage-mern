import {loginUserActionCreator} from "../store/actionCreators/userActionCreators";

export const authUser = () => {
    return async (dispatch) => {
        try {
            const url = '/api/auth/auth'
            const method = 'GET'
            const headers = {authorization: `Bearer ${localStorage.getItem('token')}`}

            const response = await fetch(url, {method, headers})
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }
            dispatch(loginUserActionCreator(data.user))
            localStorage.setItem('token', data.token)

        } catch (e) {
            alert(e.message)
            localStorage.removeItem('token')
        }
    }
}