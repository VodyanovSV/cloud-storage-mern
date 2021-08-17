import React from 'react';
import './fileList.scss'
import {useSelector} from "react-redux";
import File from "./file/File";
import {CSSTransition, TransitionGroup} from "react-transition-group";


const FileList = () => {
    const files = useSelector(state => state.fileReduser.files)
    const viewFiles = useSelector(state => state.fileReduser.viewFiles)

    if (files.length === 0) {
        return (
            <div className='dirEmpty'>
                <p>
                    Файлы не найдены
                </p>
            </div>
        )
    }

    if (viewFiles === 'list') {
        return (
            <div className='filelist'>
                <div className="header">
                    <div className="name">Название</div>
                    <div className="date">Дата</div>
                    <div className="size">Размер</div>
                </div>
                <TransitionGroup>
                    {files.map(file =>
                        <CSSTransition
                            key={file._id}
                            timeout={500}
                            classNames="file"
                            exit={false}
                        >
                            <File file={file}/>
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </div>
        );
    }
    if (viewFiles === 'plate') {
        return (
            <div className='filePlate'>
                {files.map(file =>
                    <File file={file} key={file._id}/>
                )}
            </div>
        );
    }

};

export default FileList;