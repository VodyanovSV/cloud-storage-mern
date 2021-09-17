import React, {useState} from 'react';
import {Link, NavLink} from 'react-router-dom'
import './navbar.scss'
import Logo from '../../assets/images/navbar-logo.svg'
import {useDispatch, useSelector} from "react-redux";
import {logoutUserActionCreator} from "../../store/actionCreators/userActionCreators";
import {getFile, searchFile} from "../../actions/file";
import defaultAvatar from '../../assets/images/avatar.png'
import {API_URL} from "../../config";

const Navbar = () => {
    const isAuth = useSelector(state => state.userReduser.isAuth)
    const currentUser = useSelector(state => state.userReduser.currentUser)
    const currentDir = useSelector(state => state.fileReduser.currentDir)
    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)
    const avatar = currentUser.avatar ? API_URL + currentUser.avatar : defaultAvatar

    function changeInputHandler(event) {

        setSearchName(event.target.value)

        if (searchTimeout) {
            clearTimeout(searchTimeout)
        }

        setSearchTimeout(
            setTimeout((value) => {
                if (value !== '') {
                    dispatch(searchFile(value))
                } else {
                    dispatch(getFile(currentDir, 'type'))
                }
            }, 500, event.target.value)
        )


    }

    return (
        <div className='navbar'>
            <div className="navbar__container">
                <img src={Logo} alt="" className={'navbar__logo'}/>
                <div className={'navbar__header'}>Cloud storage</div>
                {
                    !isAuth &&
                    <div className={'navbar__login'}><NavLink to={'/login'}>Войти</NavLink></div>
                }
                {
                    !isAuth &&
                    <div className={'navbar__registration'}><NavLink to={'/registration'}>Регистрация</NavLink></div>
                }
                {
                    isAuth &&
                    <div className="input-field col s6 navbar__search">
                        <input placeholder="Поиск" type="text" className="validate" onChange={changeInputHandler}
                               value={searchName}/>
                    </div>
                }
                {
                    isAuth &&
                    <div className={'navbar__login'} onClick={() => dispatch(logoutUserActionCreator())}>Выйти</div>
                }
                {
                    isAuth &&
                    <Link to={'/profile'}>
                        <img className={'navbar__avatar'} src={avatar} alt=""/>
                    </Link>
                }

            </div>
        </div>
    );
};

export default Navbar;