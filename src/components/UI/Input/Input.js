

import classes from './Input.module.css';

let Input = ((props) => {

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={props.label}>{props.label}</label>
      <input
        required
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        name={props.name}
      />
    </div>
  );
});

export default Input;
