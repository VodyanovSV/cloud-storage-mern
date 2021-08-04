import axios from "axios";
import {
    setFilesActionCreator,
    addFileActionCreator,
    deleteFileActionCreator
} from "../store/actionCreators/fileActionCreators";
import {useSelector} from "react-redux";
import {
    addFileUploaderActionCreator,
    changeFileUploaderActionCreator,
    uploaderShowActionCreator
} from "../store/actionCreators/uploaderActionCreators";
import {hideActionCreator, showActionCreator} from "../store/actionCreators/appActionCreators";

export const getFile = (dirId, sort) => {
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

export const createDir = (dirId, dirName) => {
    return async (dispatch) => {
        try {
            const url = '/api/files'
            const method = 'POST'
            const headers = {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
            const body = JSON.stringify({
                name: dirName,
                type: 'dir',
                parent: dirId
            })

            const file = await fetch(url, {method, body, headers})
            const data = await file.json()
            if (data.file) {
                dispatch(addFileActionCreator(data.file))
            } else {
                throw new Error('Ошибка создания файла')
            }
        } catch (e) {
            console.log('Ошибка в file: ', e.message)
            alert('Что-то пошло не так')
        }
    }
}
