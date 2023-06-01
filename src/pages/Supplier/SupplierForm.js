import React from "react";
import TextInput from "../../Shared/TextInput";

const SupplierForm = (props) => {
	const { values, errors, handleChange, extraData } = props;
	return (
		<div className="p-8 -mr-6 -mb-8 flex flex-wrap">
			<TextInput
				className="pr-6 pb-8 w-full lg:w-1/2" //
				label="Name"
				name="name"
				errors={errors.name}
				value={values.name}
				onChange={handleChange}
			/>
			<TextInput
				className="pr-6 pb-8 w-full lg:w-1/2" //
				label="Phone"
				name="phone"
				errors={errors.phone}
				value={values.phone}
				onChange={handleChange}
			/>
			<TextInput
				className="pr-6 pb-8 w-full lg:w-1/2" //
				label="Address"
				name="address"
				errors={errors.address}
				value={values.address}
				onChange={handleChange}
				multiline
			/>
		</div>
	);
};
export default SupplierForm;