import React from "react";

const InputRadio = (props) => {
  const {
    id,
    name,
    values,
    label,
    labelSize,
    inputRef,
    frmField,
    isInline = false,
    selectedValue,
    ...others
  } = props;
  const labelClass = `col-sm-${labelSize ? labelSize : 3} col-form-label`;
  // const inputClass = `form-control ${err ? "is-invalid" : ""}`;

  return (
    <>
      <div className="row">
        <div className={labelClass}>{label}</div>
        <div className="col-sm">
          {values.map((value, idx) => (
            <div
              className={`form-check ${isInline ? "form-check-inline" : ""}`}
              key={idx}
            >
              <input
                className="form-check-input"
                type="radio"
                name={name}
                id={`rad-${value.id}`}
                value={value.id}
                checked={selectedValue === value.id}
                {...others}
              />
              <label className="form-check-label" htmlFor={`rad-${value.id}`}>
                {value.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default InputRadio;
