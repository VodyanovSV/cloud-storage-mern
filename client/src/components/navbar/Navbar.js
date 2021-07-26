import React, {useState} from 'react';
import {Link, NavLink} from 'react-router-dom'
import './navbar.scss'
import Logo from '../../assets/images/navbar-logo.svg'
import {useDispatch, useSelector} from "react-redux";
import {logoutUserActionCreator} from "../../store/actionCreators/userActionCreators";

const Navbar = () => {
    const isAuth = useSelector(state => state.userReduser.isAuth)
    const dispatch = useDispatch()

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
                    <div className={'navbar__login'} onClick={() => dispatch(logoutUserActionCreator())}>Выйти</div>
                }
            </div>
        </div>
    );
};

export default Navbar;