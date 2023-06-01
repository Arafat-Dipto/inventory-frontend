import React from "react";

const TextInput = ({
  multiline = false,
  label,
  name,
  className,
  errors = [],
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}:
        </label>
      )}
      {multiline ? (
        <textarea
          id={name}
          name={name}
          {...props}
          className={`form-input ${errors.length ? "error" : ""}`}
        />
      ) : (
        <input
          id={name}
          name={name}
          {...props}
          className={`form-input ${errors.length ? "error" : ""}`}
        />
      )}

      {errors && <div className="form-error">{errors}</div>}
    </div>
  );
}
export default TextInput;