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
    ...others
  } = props;

  const labelClass = `col-sm-${labelSize ? labelSize : 3} col-form-label`;
  const inputClass = `form-control ${err ? "is-invalid" : ""}`;

  return (
    <>
      <div className="row">
        <label htmlFor={`sel-${id}`} className={labelClass}>
          {label}
        </label>
        <select className="col-sm form-select" name={name} id={`sel-${id}`}>
          <option value="">---------------</option>
          {values.map((value, idx) => (
            <option value={value.id}>{value.name}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Select;
