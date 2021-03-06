import React from 'react'
import classes from './NavigationItems.module.scss'
import NavigationItem from './navigationItem/NavigationItem'

const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
        </ul>
    )
}

export default NavigationItems
