import {
    UPLOADER_SHOW,
    UPLOADER_HIDE,
    ADD_FILE_UPLOADER,
    REMOVE_FILE_UPLOADER,
    CHANGE_FILE_UPLOADER
} from '../actions/uploaderActions'

const initialState = {
    isVisible: false,
    files: []
}

const reduser = (state = initialState, action) => {
    switch (action.type) {
        case UPLOADER_SHOW:
            return {...state, isVisible: true}
        case UPLOADER_HIDE:
            return {...state, isVisible: false}
        case ADD_FILE_UPLOADER:
            return {...state, files: [...state.files, action.payload]}
        case REMOVE_FILE_UPLOADER:
            return {...state, files: [...state.files.filter(file => file.id !== action.payload.id)]}
        case CHANGE_FILE_UPLOADER:
            return {
                ...state,
                files: [...state.files.map(file => file.id === action.payload.id ?
                        {...file, progress: action.payload.progress} :
                        {...file}
                )]
            }
        default:
            return state
    }
}

export default reduser