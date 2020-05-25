import React from 'react'

// STYLE
import classes from './SideDrawer.module.css'

// COMPONENTS
import Logo from './../../Logo/Logo'
import NavigationItems from './../NavigationItems/NavigationItems'
import Backdrop from './../../UI/Backdrop/Backdrop'

export default function SideDrawer(props) {

    // SET CLASSES
    let attachedClasses;
    if (props.opened) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    } else {
        attachedClasses = [classes.SideDrawer, classes.Close];
    }

    return (
        <>
            <Backdrop
                show={props.opened}
                clicked={props.closed} />
            <div
                className={attachedClasses.join(' ')}
                onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>

                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </>
    )
}
