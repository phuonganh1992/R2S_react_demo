import React from 'react';

const CustomButton = (props) => {
    const {color, className, onClick} =props;
    const buttonClass= `btn btn-${color} ${className}`;

    return (  
        <button onClick={onClick} type="button" className={buttonClass}>
            {props.children}
        </button>
    );
}
 
export default CustomButton;
