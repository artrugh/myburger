import React, { Component } from 'react';
import { connect } from 'react-redux';


import classes from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

    state = {
        showSideDrawer: false
    }
    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false })
    }
    sideDrawerToggleHandler = () => {
        this.setState(prevState => { return { showSideDrawer: !prevState.showSideDrawer } })
    }


    render() {
        return (
            <>
                <Toolbar 
                isAuth = {this.props.isAuth}
                drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                isAuth = {this.props.isAuth}
                    opened={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>

        );

    }
}


const mapStateToProps = state => ({
    isAuth: state.auth.token !== null
})
export default connect(mapStateToProps)(Layout);
