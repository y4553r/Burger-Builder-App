import React from 'react';

import styles from './SideDrawer.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const SideDrawer = props => {
	let attachedClasses = [styles.SideDrawer, styles.Close];
	if (props.show) attachedClasses = [styles.SideDrawer, styles.Open];
    return (
        <Aux>
			<Backdrop show={props.show} clicked={props.clicked}/>
            <div className={attachedClasses.join(' ')}>
                <Logo height="10%" style={{height: "32px"}} />
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
	    </Aux>
    );
};

export default SideDrawer;