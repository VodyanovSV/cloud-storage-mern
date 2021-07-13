import React, {useState} from 'react';
import './autorization.scss'
import Input from "../../UI/input/Input";
import {registrationUser} from '../../../actions/registrationUser'

const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className={'autorization'}>
            <div className={'autorization__header'}>Регистрация</div>
            <Input type={'text'} placeholder={'Введите email'} value={email} setValue={setEmail}/>
            <Input type={'password'} placeholder={'Введите пароль'} value={password} setValue={setPassword}/>
            <button
                className={'autorization__btn'}
                onClick={()=>registrationUser(email, password)}
            >
                Зарегистрироваться
            </button>
        </div>
    );
};

export default Registration;