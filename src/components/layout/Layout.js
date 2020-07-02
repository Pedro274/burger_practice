import React, {useState} from 'react'
import classes from './Layout.module.scss';
import ToolBar from '../navigation/toolbar/ToolBar';
import SideDrawer from '../navigation/sideDrawer/SideDrawer';

function Layout(props) {

    const [showSideDrawer,
        setShowSideDrawer] = useState(false)
    const handleSideDrawer = () => setShowSideDrawer(false)
    const toggleSideDrawer = () => setShowSideDrawer(!showSideDrawer)

    return (
        <div>
            <ToolBar toggle={toggleSideDrawer}/>
            <SideDrawer open={showSideDrawer} closeSideDrawer={handleSideDrawer}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </div>
    )
}

export default Layout
