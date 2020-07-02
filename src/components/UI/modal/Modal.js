import React from 'react'
import classes from './Modal.module.scss'
import BackDrop from '../backDrop/BackDrop'

function Modal(props) {
    return (
        <div>
            <BackDrop show={props.show} close={props.close}/>
            <div
                className={classes.Modal}
                onClick={props.clicked}
                style={{
                transform: props.show
                    ? 'translateY(0)'
                    : 'translate(-100vh)',
                opacity: props.show
                    ? '1'
                    : '0'
            }}>
                {props.children}
            </div>
        </div>
    )
}

export default Modal
