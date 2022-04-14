import React from "react";
import PropTypes from "prop-types";
import Validators from "./../helpers/propTypeValidators";
const Input = (props) => {
  const {
    type = "type",
    id,
    label,
    labelSize = 3,
    isLabelHidden = false,
    inputRef,
    frmField,
    err,
    errMessage,
    lastRow,
    required,
    ...others
  } = props;
  const labelClass = `col-sm-${labelSize} col-form-label ${
    isLabelHidden ? "visually-hidden" : ""
  } ${required ? "required" : ""}`;
  const inputClass = `form-control ${err ? "is-invalid" : ""}`;
  console.log(err);
  return (
    <>
      <div className={`row ${lastRow ? "" : "mb-3"}`}>
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
        <div className="col-sm">
          {others["rows"] > 1 ? (
            <textarea
              ref={inputRef}
              className={inputClass}
              id={id}
              {...others}
              {...frmField}
            ></textarea>
          ) : (
            <input
              ref={inputRef}
              type={type}
              className={inputClass}
              id={id}
              {...others}
              {...frmField}
            />
          )}
          {err ? <div className="invalid-feedback">{errMessage}</div> : ""}
        </div>
      </div>
    </>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf([
    "text",
    "textarea",
    "email",
    "url",
    "tel",
    "password",
    "number",
    "search",
  ]),
  inputRef: PropTypes.object,
  // id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  label: PropTypes.string.isRequired,
  labelSize: Validators.numberBetween(1, 12),
  lastRow: PropTypes.bool,
  frmField: PropTypes.object,
  err: PropTypes.string,
  errMessage: PropTypes.string,
  rows: PropTypes.number,
};

export default Input;
