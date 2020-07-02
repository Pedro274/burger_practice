import React from 'react'
import Logo from '../../logo/Logo'
import NavigationItems from '../navigationItems/NavigationItems';
import classes from './SideDrawer.module.scss';
import BackDrop from '../../UI/backDrop/BackDrop';

const SideDrawer = ({open, closeSideDrawer}) => {

    let sideDrawerClasses = [classes.SideDrawer, classes.Open]
    const handleBackDrop = () => closeSideDrawer()

    if (open) {
        sideDrawerClasses = [classes.SideDrawer, classes.Open]
    } else {
        sideDrawerClasses = [classes.SideDrawer, classes.Close]
    }

    return (
        <div>
            <BackDrop show={open} close={handleBackDrop}/>
            <div className={sideDrawerClasses.join(' ')}>
                <div
                    style={{
                    marginTop: "32px",
                    height: "11%"
                }}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </div>
    )
}

export default SideDrawer
