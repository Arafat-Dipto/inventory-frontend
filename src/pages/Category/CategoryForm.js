import React from "react";
import SelectInput from "../../Shared/SelectInput";
import TextInput from "../../Shared/TextInput";

const CategoryForm = (props) => {
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
			<SelectInput
				className="pr-6 pb-8 w-full lg:w-1/2" //
				label="Status"
				name="status"
				// errors={errors.status}
				value={values.status}
				onChange={handleChange}
				required
			>
				<option value="1">Active</option>
				<option value="0">Inactive</option>
			</SelectInput>
		</div>
	);
};
export default CategoryForm;