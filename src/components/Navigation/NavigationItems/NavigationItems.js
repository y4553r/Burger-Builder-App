import React from 'react';
import { connect } from 'react-redux';

import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => {
    return(
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/burger-builder" active>Burger Builder</NavigationItem>
            {props.token ? <NavigationItem link="/orders" active>Orders</NavigationItem> : null}
            {props.token ? <NavigationItem link="/logout" active>Logout</NavigationItem> :
                           <NavigationItem link="/auth" active>Authentication</NavigationItem>}
        </ul>
    );
};

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
};

export default connect(mapStateToProps)(NavigationItems);