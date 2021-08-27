import React from 'react';
import styles from './UploadFile.module.scss'
import {useDispatch} from "react-redux";
import {removeFileUploaderActionCreator} from "../../../../../store/actionCreators/uploaderActionCreators";

const UploadFile = ({file}) => {

    const dispatch = useDispatch()

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.title}>
                    {file.name}
                </p>
                <button className={styles.close} onClick={()=>dispatch(removeFileUploaderActionCreator(file))}>
                    X
                </button>
            </div>
            <div className={styles.content}>
                <div className={styles.progress} style={{width: file.progress + '%'}}></div>
                <p className={styles.percent}>{file.progress}%</p>
            </div>
        </div>
    );
};

export default UploadFile;