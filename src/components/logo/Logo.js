import React from 'react'
import burgerLogo from '../../assets/image/original.png'
import classes from './Logo.module.scss'

function Logo(props) {
    return (
        <div className={classes.Logo} style={{height: props.height}}>
            <img src={burgerLogo} alt="MyBurger"/>
        </div>
    )
}

export default Logo
