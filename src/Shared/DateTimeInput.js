import React from "react";
import DatePicker from "react-datepicker";
import { formatDateTime } from "../Shared/Helpers";

const DateTimeInput = ({ label, name, className, errors = [], ...props }) => {
    return (
        <div className={className}>
            {label && (
                <label className="form-label" htmlFor={name}>
                    {label}:
                </label>
            )}
            {/* <input
                id={name}
                name={name}
                {...props}
                className={`form-input ${errors.length ? "error" : ""}`}
            /> */}
            <DatePicker
                selected={props.value ? new Date(props.value) : ""}
                onChange={(date) => {
                    // console.log(
                    //     date,
                    //     formatDateTime(date, "YYYY-MM-DD HH:mm:ss")
                    // );
                    props.onChange({
                        target: {
                            name: name,
                            value: formatDateTime(date, "yyyy-MM-dd HH:mm:ss")
                        }
                    });
                }}
                className={`form-input ${errors.length ? "error" : ""}`}
                dateFormat="MMMM d, yyyy p"
                // minDate={new Date()}
                timeIntervals={15}
                showMonthDropdown
                showTimeSelect
                isClearable
                withPortal
            />
            {errors && <div className="form-error">{errors}</div>}
        </div>
    );
}
export default DateTimeInput;