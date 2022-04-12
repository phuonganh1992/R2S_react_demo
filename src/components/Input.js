import { Component } from "react";

export default class Input extends Component {
  state = {};

  render() {
    const {
      id,
      label,
      labelSize,
      isLabelHidden = false,
      inputRef,
      frmField,
      err,
      errMessage,
      ...others
    } = this.props;
    const labelClass = `col-sm-${labelSize ? labelSize : 3} col-form-label ${
      isLabelHidden ? "visually-hidden" : ""
    }`;
    const inputClass = `form-control ${err ? "is-invalid" : ""}`;
    return (
      <>
        <div className="row mb-3">
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
                type="text"
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
  }
}
