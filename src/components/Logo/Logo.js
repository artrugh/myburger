import React from 'react'

import classes from './Logo.module.css'
import burgerLogo from './../../assets/images/burger-logo.png'

export default function () {
    return (
        <div className={classes.Logo}>
            <img
                alt="Logo"
                src={burgerLogo} />
        </div>
    )
}
