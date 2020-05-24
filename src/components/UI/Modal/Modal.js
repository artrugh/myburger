import React, { memo } from 'react'

import classes from './Modal.module.css'
import Backdrop from './../Backdrop/Backdrop'

const Modal = props => (
    <>
        <Backdrop
            clicked={props.modalClosed}
            show={props.show} />
        <div
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh )',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </>
)

export default memo(Modal,
    (prevProps, nextProps) => nextProps.show === prevProps.show &&
        nextProps.children === prevProps.children);