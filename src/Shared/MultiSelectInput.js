import React from "react";
import Select from "react-select";

const MultiSelectInput = (props) => {
	const {
		isClearable = false,
		isDisabled = false,
		isMulti = false,
		options = [],
		onChange = null,
		name = null,
		value = null,
		placeholder = null,
		className = "",
		label = null,
		errors = [],
	} = props;

	// console.log(props);

	const [selectedOption, setSelectedOption] = React.useState(value);
	const [show, setShow] = React.useState(false);

	React.useEffect(() => {
		// Component did mount
		setShow(true);
	}, []);

	const handleChange = (selected) => {
		// console.log(selected);
		if (selected && selected.constructor && selected.constructor.name == "Object") {
			onChange &&
				onChange({
					target: {
						name: name,
						value: selected.value,
					},
				});
		} else if (selected && selected.constructor && selected.constructor.name == "Array") {
			onChange &&
				onChange({
					target: {
						name: name,
						value: Object.keys(selected).map(function (key) {
							return selected[key].value;
						}),
					},
				});
		} else {
			onChange &&
				onChange({
					target: {
						name: name,
						value: null,
					},
				});
		}
	};

	return (
		show && (
			<div className={className}>
				{label && (
					<label className="form-label" htmlFor={name}>
						{label}:
					</label>
				)}
				<Select
					// value={selectedOption} //
					onChange={handleChange}
					options={options}
					value={value}
					name={name}
					placeholder={placeholder}
					className="react-select-container"
					classNamePrefix="react-select"
					theme={(theme) => ({
						...theme,
						// borderRadius: 0,
						colors: {
							...theme.colors,
							// primary25: "#7f7f7f",
							// primary50: "#7f7f7f",
							// primary: "#016951"
						},
					})}
					isMulti={isMulti}
					isDisabled={isDisabled}
					isClearable={isClearable}
				/>
				{errors && <div className="form-error">{errors}</div>}
			</div>
		)
	);
};

export default MultiSelectInput;
