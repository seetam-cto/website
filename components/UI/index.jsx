import React from 'react'

export const CounterInput = ({label = "", value = 0, onChange, min = 0}) => {
    return (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <div className="form-counter">
                <span
                onClick={() => value > min && onChange(value - 1)}
                >-</span>
                <input type="number"
                    value={value}
                    onChange={(e) => onChange(e.target.value)} />
                <span
                onClick={() => onChange(value + 1)}
                >+</span>
            </div>
        </div>
    )
}

export const CheckboxInput = ({label = "", value = false, onChange, icon}) => {
    return(
        <div onClick={() => onChange(!value)} className="form-checkbox">
            <div className={`form-checkbox-box ${value && 'active'}`}>
                {value && <i className='bx bx-check' ></i>}
            </div>
            {label}
            {icon && <i className={icon} ></i>}
        </div>
    )
}