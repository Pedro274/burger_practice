import React from 'react'
import classes from './Input.module.scss'

const Input = (props) => {
    let inputElement = null;

    switch (props.inputtype) {
        case('input'):
            inputElement = <input
                className={classes.InputElement}
                value={props.value}
                type={props.config.type}
                placeholder={props.config.placeholder}
                onChange={props.inputChange}/>
            break;
        case('textArea'):
            inputElement = <textarea/>
            break;
        case('select'):
            inputElement = (
                <select className={classes.InputElement} onChange={props.inputChange}>
                    {props
                        .config
                        .options
                        .map(option => <option key={option.value} value={option.value}>{option.displayValue}</option>)}
                </select>
            )
            break;
        default:
            inputElement = <input/>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input
