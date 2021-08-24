import {UPLOADER_SHOW, UPLOADER_HIDE, ADD_FILE_UPLOADER, REMOVE_FILE_UPLOADER, CHANGE_FILE_UPLOADER} from '../actions/uploaderActions'


export const uploaderShowActionCreator = () => ({
    type: UPLOADER_SHOW
})

export const uploaderHideActionCreator = () => ({
    type: UPLOADER_HIDE
})

export const addFileUploaderActionCreator = (file) => ({
    type: ADD_FILE_UPLOADER,
    payload: file
})

export const removeFileUploaderActionCreator = (file) => ({
    type: REMOVE_FILE_UPLOADER,
    payload: file
})

export const changeFileUploaderActionCreator = (file) => ({
    type: CHANGE_FILE_UPLOADER,
    payload: file
})
