import React, {useEffect, useState} from 'react';

const Disk = () => {
    
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
        </div>
    )
};


export default Disk;