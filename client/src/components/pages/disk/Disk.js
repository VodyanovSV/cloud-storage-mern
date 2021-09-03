import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFile, uploadFile} from "../../../actions/file";
import './disk.scss'
import FileList from "./fileList/FileList";
import Popup from "./popup/Popup";
import {popupToggleActionCreator} from "../../../store/actionCreators/popupActionCreators";
import {
    popStackDirActionCreator,
    setCurrentDirActionCreator,
    setViewFilesActionCreator
} from "../../../store/actionCreators/fileActionCreators";
import Uploader from "./uploader/Uploader";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.fileReduser.currentDir)
    const stackDir = useSelector(state => state.fileReduser.stackDir)
    const loaderIsVisible = useSelector(state => state.appReduser.loaderIsVisible)
    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('type')

    useEffect(() => {
        dispatch(getFile(currentDir, sort))
    }, [currentDir, sort])

    const popupOpen = () => {
        dispatch(popupToggleActionCreator('block'))
    }

    const backDirHandler = () => {
        dispatch(setCurrentDirActionCreator(stackDir[stackDir.length - 1]))
        dispatch(popStackDirActionCreator())
    }

    const fileUploadHandler = (event) => {
        const files = [...event.target.files]
        files.forEach((file) => {
            dispatch(uploadFile(file, currentDir))
        })
    }

    const dragEnterHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }
    const dragLeaveHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }
    const dragOverHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    const dropHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()

        const files = [...event.dataTransfer.files]
        files.forEach((file) => {
            dispatch(uploadFile(file, currentDir))
        })

        setDragEnter(false)
    }

    if (loaderIsVisible) {
        return (
            <div className='loader'>
                <div className="lds-dual-ring"></div>
            </div>
        )
    }

    function uploadClickHandler() {
        const inputUpload = document.getElementById('inputUploadFile').click()
    }

    return (
        !dragEnter ?
            <div className='disk' onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler}
                 onDragOver={dragOverHandler}>
                <Popup/>
                <div className="btns">
                    <button className="back" onClick={backDirHandler}>Назад</button>
                    <button className="create" onClick={popupOpen}>Создать папку</button>
                    <div className="upload">
                        <label htmlFor="inputUploadFile">Загрузить файл</label>
                        <input id="inputUploadFile" type="file" multiple="multiple" onChange={(event) => {
                            fileUploadHandler(event)
                        }}/>
                    </div>
                    <button className="btnUpload" onClick={uploadClickHandler}>Загрузить файл</button>
                    <select className="sort" name="sort" id="" value={sort}
                            onChange={event => setSort(event.target.value)}>
                        <option value="type">По типу</option>
                        <option value="name">По имени</option>
                        <option value="date">По дате</option>
                    </select>
                    <button className="view list" onClick={()=>dispatch(setViewFilesActionCreator('list'))}></button>
                    <button className="view plate" onClick={()=>dispatch(setViewFilesActionCreator('plate'))}></button>
                </div>
                <FileList/>
                <Uploader/>
            </div>
            :
            <div className="drag-area" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler}
                 onDragOver={dragOverHandler} onDrop={dropHandler}>
                <div className="drag-area__wrap">
                    <p>Перетащите файлы сюда</p>
                </div>
            </div>
    )
};


export default Disk;