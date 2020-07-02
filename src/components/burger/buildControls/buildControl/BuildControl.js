import React from 'react';
import classes from './BuildControl.module.scss';


function BuildControl({label, more, less, disabled}) {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{label}</div>
            <button className={classes.Less} onClick={less} disabled={disabled}>Less</button>
            <button className={classes.More} onClick={more}>More</button>
        </div>
    )
}

export default BuildControl
