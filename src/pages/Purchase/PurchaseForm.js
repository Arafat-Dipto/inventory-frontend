import React from "react";
import DateTimeInput from "../../Shared/DateTimeInput";
import { findValue } from "../../Shared/Helpers";
import MultiSelectInput from "../../Shared/MultiSelectInput";
import TextInput from "../../Shared/TextInput";

const PurchaseForm = (props) => {
	const { values, errors, handleChange, extraData } = props;
	return (
		<div className="p-8 -mr-6 -mb-8 flex flex-wrap">
			<MultiSelectInput
				label="Supplier"
				inputId="supplier"
				id="supplier"
				instanceId="supplier"
				className="pr-6 pb-8 w-full lg:w-1/2"
				placeholder="Select supplier"
				name="supplier"
				errors={errors.supplier}
				value={findValue(values.supplier, extraData?.suppliers)}
				onChange={handleChange}
				options={extraData?.suppliers}
			/>
			<MultiSelectInput
				label="Product"
				inputId="product"
				id="product"
				instanceId="product"
				className="pr-6 pb-8 w-full lg:w-1/2"
				placeholder="Select product"
				name="product"
				errors={errors.product}
				value={findValue(values.product, extraData?.products)}
				onChange={handleChange}
				options={extraData?.products}
			/>
			<TextInput
				className="pr-6 pb-8 w-full lg:w-1/2" //
				label="Product Quantity"
				name="product_qty"
				type="number"
				errors={errors.product_qty}
				value={values.product_qty}
				onChange={handleChange}
			/>
			<TextInput
				className="pr-6 pb-8 w-full lg:w-1/2" //
				label="Product Price"
				name="product_price"
				type="number"
				errors={errors.product_price}
				value={values.product_price}
				onChange={handleChange}
			/>

			<DateTimeInput
				className="pr-6 pb-8 w-full lg:w-1/2"
				label="Purchase Date"
				name="purchase_date"
				errors={errors.purchase_date}
				value={values.purchase_date}
				onChange={handleChange}
			/>

		</div>
	);
};
export default PurchaseForm;