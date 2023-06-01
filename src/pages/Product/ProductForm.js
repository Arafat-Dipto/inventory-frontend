import React from "react";
import { findValue } from "../../Shared/Helpers";
import MultiSelectInput from "../../Shared/MultiSelectInput";
import SelectInput from "../../Shared/SelectInput";
import TextInput from "../../Shared/TextInput";

const ProductForm = (props) => {
	const { values, errors, handleChange, extraData } = props;
	return (
		<div className="p-8 -mr-6 -mb-8 flex flex-wrap">
			<TextInput
				className="pr-6 pb-8 w-full lg:w-1/2" //
				label="Code"
				name="code"
				errors={errors.code}
				value={values.code}
				onChange={handleChange}
			/>
			<TextInput
				className="pr-6 pb-8 w-full lg:w-1/2" //
				label="Name"
				name="name"
				errors={errors.name}
				value={values.name}
				onChange={handleChange}
			/>
			<MultiSelectInput
				label="Category"
				inputId="category"
				id="category"
				instanceId="category"
				className="pr-6 pb-8 w-full lg:w-1/2"
				placeholder="Select category"
				name="category"
				errors={errors.category}
				value={findValue(values.category, extraData?.categories)}
				onChange={handleChange}
				options={extraData?.categories}
			/>
			<TextInput
				className="pr-6 pb-8 w-full lg:w-1/2" //
				label="Stock Quantity"
				name="stock_qty"
				type="number"
				errors={errors.stock_qty}
				value={values.stock_qty}
				onChange={handleChange}
			/>
			<TextInput
				className="pr-6 pb-8 w-full lg:w-1/2" //
				label="Price"
				name="price"
				type="number"
				errors={errors.price}
				value={values.price}
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
export default ProductForm;