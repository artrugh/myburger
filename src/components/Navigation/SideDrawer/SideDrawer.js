import React from 'react'

import classes from './SideDrawer.module.css'

import Logo from './../../Logo/Logo'
import NavigationItems from './../NavigationItems/NavigationItems'
import Backdrop from './../../UI/Backdrop/Backdrop'

export default function SideDrawer(props) {

    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.opened) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return (
        <>
            <Backdrop
                show={props.opened}
                clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>

                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    )
}
