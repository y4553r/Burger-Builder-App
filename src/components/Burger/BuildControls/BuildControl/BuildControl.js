import React from 'react';

import styles from './BuildControl.module.css';

const BuildControl = props => {
    return(
        <div className={styles.BuildControl}>
            <div className={styles.Label}> {props.label} </div>
            <button onClick={props.remove} className={styles.Less} disabled={props.disabledInfo[props.type]}> Less </button>
            <button onClick={props.add} className={styles.More}> More </button>
        </div>
    );
};

export default BuildControl;