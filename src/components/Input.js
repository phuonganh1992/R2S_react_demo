import {Component} from "react";

export default class Input extends Component {
    state = {}

    render() {
        const {id, label, labelSize, inputRef, ...others} = this.props;
        const labelClass = `col-sm-${labelSize ? labelSize : 3} col-form-label`;
        return (
            <>
                <div className="row mb-3">
                    <label htmlFor={id} className={labelClass}>{label}</label>
                    <div className="col-sm">
                        {others["rows"] > 1 ?
                            (<textarea ref={inputRef} className="form-control" id={id} {...others}></textarea>)
                            :
                            (<input ref={inputRef} type="text" className="form-control" id={id} {...others}/>)}

                    </div>
                </div>
            </>

        );
    }
}