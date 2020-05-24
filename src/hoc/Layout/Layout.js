import React, { useState } from 'react';
import {  useSelector } from 'react-redux';


import classes from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

const Layout = props => {

    const [showSideDrawer, setSideDrawer] = useState(false)

    const isAuth = useSelector(state => state.auth.token !== null)
    const sideDrawerCloseHandler = () => {
        setSideDrawer(false)
    }
    const sideDrawerToggleHandler = () => {
        setSideDrawer(!showSideDrawer)
    }
    return (
        <>
            <Toolbar
                isAuth={isAuth}
                drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer
                isAuth={isAuth}
                opened={showSideDrawer}
                closed={sideDrawerCloseHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </>

    );
}

export default Layout;
