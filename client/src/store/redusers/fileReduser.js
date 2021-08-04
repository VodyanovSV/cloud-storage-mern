import {
    SET_FILES,
    SET_CURRENT_DIR,
    ADD_FILE,
    PUSH_STACK_DIR,
    POP_STACK_DIR,
    DELETE_FILE,
    SET_VIEW_FILES
} from '../actions/fileActions.js'

const initialState = {
    files: [],
    currentDir: null,
    stackDir: [],
    viewFiles: 'list'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILES:
            return {...state, files: action.payload}
        case SET_CURRENT_DIR:
            return {...state, currentDir: action.payload}
        case ADD_FILE:
            return {...state, files: [...state.files, action.payload]}
        case PUSH_STACK_DIR:
            return {...state, stackDir: [...state.stackDir, action.payload]}
        case POP_STACK_DIR:
            let newStackDir = [...state.stackDir]
            newStackDir.pop()
            return {...state, stackDir: newStackDir}
        case DELETE_FILE:
            return {...state, files: [...state.files.filter((file) => (file._id !== action.payload._id))]}
        case SET_VIEW_FILES:
            return {...state, viewFiles: action.payload}
        default:
            return state
    }
}

export default reducer