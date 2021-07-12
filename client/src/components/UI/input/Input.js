import React from 'react';
import './input.scss'

const Input = (props) => {
    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            onChange={event => props.setValue(event.target.value)}
            value={props.value}
        />
    );
};

export default Input;