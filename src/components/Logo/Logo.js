import React from 'react';

import styles from './Logo.module.css';
import logo from '../../assets/images/logo.png';

const Logo = props => {
    return(
        <img src={logo} className={styles.Logo} style={{height: props.height}} alt="MyBurger"/>
    );
};

export default Logo;