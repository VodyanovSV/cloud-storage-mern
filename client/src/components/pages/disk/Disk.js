import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFile, uploadFile} from "../../../actions/file";
import './disk.scss'
import FileList from "./fileList/FileList";


const Disk = () => {
	const dispatch = useDispatch()
	const currentDir = useSelector(state => state.fileReduser.currentDir)
	
	useEffect(() => {
        dispatch(getFile(currentDir))
    }, [currentDir])
    
    return (
        <div className='disk'>
            <div className="btns">
                <button className="back">Назад</button>
                <button className="create">Создать папку</button>
                <div className="upload">
                        <label htmlFor="inputUploadFile">Загрузить файл</label>
                        <input id="inputUploadFile" type="file" multiple="multiple"
                        }}/>
                </div>
                <button className="btnUpload">Загрузить файл</button>
                <select className="sort" name="sort" id="" value={sort}
                        <option value="type">По типу</option>
                        <option value="name">По имени</option>
                        <option value="date">По дате</option>
                </select>
                <button className="view list"></button>
                <button className="view plate"></button>
            </div>
			<FileList/>
        </div>
    )
};


export default Disk;