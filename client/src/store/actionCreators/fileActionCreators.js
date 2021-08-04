import {SET_FILES, SET_CURRENT_DIR, ADD_FILE, PUSH_STACK_DIR, POP_STACK_DIR, DELETE_FILE, SET_VIEW_FILES} from '../actions/fileActions.js'

export const setFilesActionCreator = (files) => ({
    type: SET_FILES,
    payload: files
})

export const setCurrentDirActionCreator = (currentDir) => ({
    type: SET_CURRENT_DIR,
    payload: currentDir
})

export const addFileActionCreator = (file) => ({
    type: ADD_FILE,
    payload: file
})

export const pushStackDirActionCreator = (dirId) => ({
    type: PUSH_STACK_DIR,
    payload: dirId
})

export const popStackDirActionCreator = () => ({
    type: POP_STACK_DIR
})

export const deleteFileActionCreator = (file) => ({
    type: DELETE_FILE,
    payload: file
})

export const setViewFilesActionCreator = (view) => ({
    type: SET_VIEW_FILES,
    payload: view
})