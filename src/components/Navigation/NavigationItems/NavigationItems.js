import React from 'react'

// STYLE
import classes from './NavigationItems.module.css'

// COMPONENTS
import NavigationItem from './NavigationItem/NavigationItem'

export default function NavigationItems(props) {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' exact>Burger Builder</NavigationItem>
            {props.isAuth ? <>
                <NavigationItem link='/orders'>Orders</NavigationItem>
                <NavigationItem link='/logout'>Logout</NavigationItem>
            </>
                :
                <NavigationItem link='/auth'>Authenticate</NavigationItem>
            }
        </ul>
    )
}
