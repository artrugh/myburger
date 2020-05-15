import React from 'react'

import classes from './BuildControl.module.css'

export default function BuildControl(props) {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button
                className={classes.Less}
                disabled={props.disabled}
                onClick={props.removed}

            >Less</button>
            <button
                onClick={props.added}
                className={classes.More}>More</button>
        </div>
    )
}
