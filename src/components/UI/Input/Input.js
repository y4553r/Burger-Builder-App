import React from 'react';

import styles from './Input.module.css';

const Input = props => {
  let inputElement = null;
  let errorMessage = null;
  const inputClasses = [styles.InputElement];
  if (props.invalid && props.shouldValidate) {
    inputClasses.push(styles.Invalid);
    errorMessage = <p className={styles.ValidationError}>Please enter a valid {props.valueType}</p>
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        className={inputClasses.join(' ')}
        {... props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
      break;
    case ('textarea'):
      inputElement = <textarea
        className={inputClasses.join(' ')}
        {... props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
      break;
    case ('select'):
      inputElement = (<select
        className={inputClasses.join(' ')}
        {... props.elementConfig}
        value={props.value}
        onChange={props.changed}>
          {props.elementConfig.options.map(o => {
            return <option key={o.value} value={o.value}>{o.displayValue}</option>
          })}
        </select>);
      break;
    default:
      inputElement = <input
        className={styles.InputElement}
        {... props.elementConfig}
        value={props.value} />
  }

  return (
    <div className={styles.Input}>
      {/* <label className={styles.Label}>{props.label}</label> */}
      {inputElement}
      {errorMessage}
    </div>
  );
}

export default Input;