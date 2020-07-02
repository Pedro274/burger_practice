import React from 'react'
import classes from './ToolBar.module.scss'
import Logo from '../../logo/Logo'
import NavigationItems from '../navigationItems/NavigationItems'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'

const ToolBar = (props) => (
    <header className={classes.ToolBar}>
        <div onClick={props.toggle} className={classes.MenuButton}><FontAwesomeIcon icon={faBars}/></div>
        <Logo height="80%"/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
)

export default ToolBar
