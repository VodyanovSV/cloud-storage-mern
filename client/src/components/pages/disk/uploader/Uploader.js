import React from 'react';
import styles from './Uploader.module.scss'
import UploadFile from "./uploadFile/UploadFile";
import {useDispatch, useSelector} from "react-redux";
import {uploaderHideActionCreator} from "../../../../store/actionCreators/uploaderActionCreators";


const Uploader = () => {

    const isVisible = useSelector((state) => state.uploaderReduser.isVisible)
    const dispatch = useDispatch()
    const files = useSelector((state) => state.uploaderReduser.files)

    return (isVisible &&
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.title}>
                    Загрузки
                </p>
                <button className={styles.close} onClick={() => {
                    dispatch(uploaderHideActionCreator())
                }}>
                    X
                </button>
            </div>
            <div className={styles.content}>
                {files.map(file => <UploadFile key={file.id} file={file}/>)}
            </div>
        </div>
    );
};

export default Uploader;