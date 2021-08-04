import React from 'react';
import './fileList.scss'
import {useSelector} from "react-redux";

const FileList = () => {
    const files = useSelector(state => state.fileReduser.files)

    return (

    );

};

export default FileList;