import React, { Component } from 'react';

import Aux from '../Auxiliary/Auxiliary';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    sideDrawerToggleHandler = () => {
        this.setState( prevState => ({showSideDrawer: !prevState.showSideDrawer}) );
    }

    render() {
        return (
            <Aux>
                <Toolbar clicked={this.sideDrawerToggleHandler}></Toolbar>
                <SideDrawer show={this.state.showSideDrawer} clicked={this.sideDrawerToggleHandler}/>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;
