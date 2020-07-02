import React from 'react'
import classes from './BackDrop.module.scss'

function BackDrop({show, close}) {
    return (show
        ? <div className={classes.Backdrop} onClick={close}></div>
        : null)
}

export default BackDrop
