import {loginUserActionCreator} from '../store/actionCreators/userActionCreators'

export const loginUser = (email, password) => {
    return async (dispatch) => {
        try {
            const body = JSON.stringify({email, password})
            const headers = {'Content-Type': 'application/json'}
            const url = '/api/auth/login'

            const response = await fetch(url, {method: 'POST', body, headers})
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }

            dispatch(loginUserActionCreator(data.user))
            localStorage.setItem('token', data.token)

        } catch (e) {
            alert(e.message)
        }
    }
}