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

export const uploadFile = (file, parent) => {
    return async (dispatch) => {
        try {
            const url = `/api/files/upload`
            // const method = 'POST'
            const headers = {authorization: `Bearer ${localStorage.getItem('token')}`}
            const body = new FormData()
            body.append('file', file)
            if (parent) {
                body.append('parent', parent)
            }

            const uploadFile = {name: file.name, progress: 0, id: Date.now()}
            dispatch(uploaderShowActionCreator())
            dispatch(addFileUploaderActionCreator(uploadFile))

            // const response = await fetch(url, {method, body, headers})
            // const data = await response.json()
            // dispatch(addFileActionCreator(data.file))

            const response = await axios.post(url, body, {
                headers,
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    // console.log('total', totalLength)
                    if (totalLength) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        dispatch(changeFileUploaderActionCreator(uploadFile))
                    }
                }
            })
            const data = response.data
            dispatch(addFileActionCreator(data.file))
        } catch (e) {
            console.log('Ошибка в file: ', e.message)
            alert('Что-то пошло не так')
        }
    }
}

export const downloadFile = async (file) => {
    try {
        const response = await fetch(
            `api/files/download?id=${file._id}`,
            {
                method: 'GET',
                headers: {authorization: `Bearer ${localStorage.getItem('token')}`}
            })
        if (response.ok) {
            const blob = await response.blob()
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = file.name
            document.body.appendChild(link)
            link.click()
            link.remove()
        }
    } catch (e) {
        console.log('Ошибка в file: ', e.message)
        alert('Что-то пошло не так')
    }
}

export const deleteFile = (file) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`api/files?id=${file._id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await response.json()

            dispatch(deleteFileActionCreator(file))

            alert(data.message)

        } catch (e) {
            console.log('Ошибка в file: ', e.message)
            alert('Что-то пошло не так ERR')
        }
    }
}

