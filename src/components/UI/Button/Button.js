import React from 'react';

import styles from './Button.module.css';

const Button = props => {
    const classes = props.disabled ? [styles.Button, styles[props.btnType], styles.Disabled] : [styles.Button, styles[props.btnType]];
    return (
        <button
            disabled={props.disabled}
            onClick={props.clicked}
            className={classes.join(' ')} >
            {props.children}</button>
    );
}

export default Button;