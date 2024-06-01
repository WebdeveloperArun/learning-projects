import React from "react";


const Input = ({ value, label, placeholder, type, onChange, className = '', divClassName = '', ...props }) => {


  const handleChange = (e) => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <div className={divClassName}>
      {label && <label htmlFor="input-field">{label}</label>}
      <input
        type={type}
        value={value}
        className={className}
        placeholder={placeholder}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};

export default Input;
