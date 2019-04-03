import React from 'react';

import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = props => {
    return(
        <header className={styles.Toolbar}>
            <div onClick={props.clicked} className={styles.DrawerToggle}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <Logo height="100%"/>
            <div className={styles.DesktopOnly}>
                <NavigationItems />
            </div>
        </header>
    );
};

export default Toolbar;