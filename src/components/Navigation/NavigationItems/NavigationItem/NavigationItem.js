import React from 'react'
import { NavLink } from 'react-router-dom';

// STYLE
import classes from './NavigationItem.module.css'

export default function (props) {
    
    return (
        <li className={classes.NavigationItem}>
            <NavLink
                activeClassName={classes.active}
                exact={props.exact}
                to={props.link}>{props.children}</NavLink>
        </li>
    )
}

