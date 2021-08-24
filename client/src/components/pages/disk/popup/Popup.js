import React, {useState} from 'react';
import './popup.scss'
import Input from "../../../UI/input/Input";
import {useDispatch, useSelector} from "react-redux";
import closer from '../../../../assets/images/closer.png'
import {popupToggleActionCreator} from "../../../../store/actionCreators/popupActionCreators";
import {createDir} from "../../../../actions/file";

const Popup = () => {
    const [dirName, setDirName] = useState('')
    const popupDisplay = useSelector((state) => state.popupReduser.display)
    const currentDir = useSelector(state => state.fileReduser.currentDir)
    const dispatch = useDispatch()

    const popupCloseHandler = () => {
        dispatch(popupToggleActionCreator('none'))
    }

    const createDirHandler = () => {
        dispatch(createDir(currentDir, dirName))
        setDirName('')
        dispatch(popupToggleActionCreator('none'))
    }

    return (
        <div className='popup' style={{display: popupDisplay}} onClick={popupCloseHandler}>
            <div className="content" onClick={(event) => {
                event.stopPropagation()
            }}>
                <img className="close" src={closer} alt="" onClick={popupCloseHandler}/>
                <div className={'header'}>Создать папку</div>
                <Input type={'text'} placeholder={'Введите название'} value={dirName} setValue={setDirName}/>
                <button
                    className={'btn'}
                    onClick={createDirHandler}
                >
                    Создать
                </button>
            </div>
        </div>
    );
};

export default Popup;