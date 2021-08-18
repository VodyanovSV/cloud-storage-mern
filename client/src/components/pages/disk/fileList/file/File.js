import React from 'react';
import './file.scss'
import dirLogo from '../../../../../assets/images/dir.svg'
import fileLogo from '../../../../../assets/images/file.svg'
import {useDispatch, useSelector} from "react-redux";
import {
    setCurrentDirActionCreator,
    pushStackDirActionCreator
} from "../../../../../store/actionCreators/fileActionCreators";
import {deleteFile, downloadFile} from "../../../../../actions/file";
import sizeFormat from "../../../../../utils/sizeFormat";

const File = (props) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.fileReduser.currentDir)
    const viewFiles = useSelector(state => state.fileReduser.viewFiles)

    const openDirHandler = () => {
        if (props.file.type === 'dir') {
            dispatch(pushStackDirActionCreator(currentDir))
            dispatch(setCurrentDirActionCreator(props.file._id))
        }
    }

    const donwloadClickHandler = (event) => {
        event.stopPropagation()
        downloadFile(props.file)
    }

    function deleteClickHandler(event) {
        event.stopPropagation()
        dispatch(deleteFile(props.file))
    }

    if (viewFiles === 'list') {
        return (
            <div className='fileInList' onClick={openDirHandler}>
                <img className="file__img" src={props.file.type === 'dir' ? dirLogo : fileLogo} alt=""/>
                <div className="file__name">{props.file.name}</div>
                <div className="file__date">{props.file.date}</div>
                <div className="file__size">{sizeFormat(props.file.size)}</div>
                {props.file.type !== 'dir' &&
                <button className="file__btn file__download" onClick={donwloadClickHandler}></button>}
                <button className="file__btn file__delete" onClick={deleteClickHandler}></button>
            </div>
        );
    }

    if (viewFiles === 'plate') {
        return (
            <div className='fileInPlate' onClick={openDirHandler}>
                <img className="file__img" src={props.file.type === 'dir' ? dirLogo : fileLogo} alt=""/>
                <div className="file__name">{props.file.name}</div>
                <div className="file__btns">
                    {props.file.type !== 'dir' &&
                    <button className="file__btn file__download" onClick={donwloadClickHandler}></button>}
                    <button className="file__btn file__delete" onClick={deleteClickHandler}></button>
                </div>
            </div>
        );
    }


};

export default File;