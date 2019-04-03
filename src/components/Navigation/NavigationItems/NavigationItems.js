import React from 'react';

import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => {
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/burger-builder" active>Burger Builder</NavigationItem>
            {props.isAuth ? <NavigationItem link="/orders" active>Orders</NavigationItem> : null}
            {props.isAuth ? <NavigationItem link="/logout" active>Logout</NavigationItem> :
                            <NavigationItem link="/auth" active>Authentication</NavigationItem>}
        </ul>
    );
};


export default NavigationItems;