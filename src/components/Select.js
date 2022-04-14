import React from "react";

const Select = (props) => {
  const {
    id,
    name,
    values,
    label,
    labelSize,
    inputRef,
    frmField,
    err,
    errMessage,
    selectedValue,
    ...others
  } = props;

  const labelClass = `col-sm-${labelSize ? labelSize : 3} col-form-label`;
  const inputClass = `col-sm form-select ${err ? "is-invalid" : ""}`;

  return (
    <>
      <div className="row">
        <label htmlFor={`sel-${id}`} className={labelClass}>
          {label}
        </label>
        <div className="col-sm">
          <select
            name={name}
            id={`sel-${id}`}
            defaultValue={selectedValue}
            {...others}
            className={inputClass}
          >
            <option value="">---------------</option>
            {values.map((value, idx) => (
              <option key={idx} value={value.id}>
                {value.name}
              </option>
            ))}
          </select>
          {err ? <div className="invalid-feedback">{errMessage}</div> : ""}
        </div>
      </div>
    </>
  );
};

export default Select;
