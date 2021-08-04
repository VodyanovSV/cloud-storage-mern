import {
    setFilesActionCreator
} from "../store/actionCreators/fileActionCreators";
import {useSelector} from "react-redux";
import {hideActionCreator, showActionCreator} from "../store/actionCreators/appActionCreators";

export const getFile = (dirId) => {
    return async (dispatch) => {
        try {

            dispatch(showActionCreator())

            let url = `/api/files?sort=${sort}`
            if (dirId) {
                url += `&parent=${dirId}`
            }

            const method = 'GET'
            const headers = {authorization: `Bearer ${localStorage.getItem('token')}`}
            const files = await fetch(url, {method, headers})
            const data = await files.json()
            dispatch(setFilesActionCreator(data))
        } catch (e) {
            console.log('Ошибка в file: ', e.message)
            alert('Что-то пошло не так')
        } finally {
            dispatch(hideActionCreator())
        }
    }
}
