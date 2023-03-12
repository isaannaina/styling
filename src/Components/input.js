import React from 'react';

const Input = (props) => {
  const { label, type, id, value, onChange, onBlur, isValid } = props;

  return (
    <div className={`${props.className} ${isValid === false ? 'invalid' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Input;
