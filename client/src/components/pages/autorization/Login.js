import React, {useState} from 'react';
import './autorization.scss'
import Input from "../../UI/input/Input";
import {loginUser} from '../../../actions/loginUser'
import {useDispatch} from "react-redux";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    return (
        <div className={'autorization'}>
            <div className={'autorization__header'}>Авторизация</div>
            <Input type={'text'} placeholder={'Введите email'} value={email} setValue={setEmail}/>
            <Input type={'password'} placeholder={'Введите пароль'} value={password} setValue={setPassword}/>
            <button
                className={'autorization__btn'}
                onClick={()=>dispatch(loginUser(email, password))}
            >
                Войти
            </button>
        </div>
    );
};

export default Login;