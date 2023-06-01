import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DateTimeInput from "../../Shared/DateTimeInput";
import DeleteButton from "../../Shared/DeleteButton";
import { findValue } from "../../Shared/Helpers";
import Layout from "../../Shared/Layout";
import LoadingButton from "../../Shared/LoadingButton";
import MultiSelectInput from "../../Shared/MultiSelectInput";
import TextInput from "../../Shared/TextInput";

const PurchaseEdit = () => {
	const params = useParams();
	const [sending, setSending] = useState(false);
	const navigate = useNavigate();
	const [errors, setErrors] = useState([]);
	const [data, setData] = useState([]);
	const [values, setValues] = useState({
		supplier: "",
		invoice_no: "",
		product: "",
		product_qty: "",
		product_price: "",
		purchase_date: "",
		countRows: 0,
		productsRow: [],
		productList: [],
		note: ""
	});
	const ID = params.id;
	const ACCESS_TOKEN = JSON.parse(localStorage.getItem('access_token'));
	const getPurchaseById = async (ID) => {
		const res = await axios.get(
			`http://127.0.0.1:8000/api/purchases/${ID}/edit`, {
			headers: {
				Authorization: `Bearer ${ACCESS_TOKEN.token}`
			}
		}
		);

		setData(res.data);
		setValues({
			invoice_no: res.data.item.invoice_no,
			supplier: res.data.item.supplier,
			productsRow: res.data.item.productsRow,
			purchase_date: res.data.item.purchase_date,
			note: res.data.item.note
		})
	};
	useEffect(() => {
		getPurchaseById(ID);
	}, [ID]);

	function handleChange(e) {
		const key = e.target.name;
		const value = e.target.value;
		setValues((values) => ({
			...values,
			[key]: value,
		}));
	}


	function handleSubmit(e) {
		e.preventDefault();
		setSending(true);

		const res = axios.put(
			`http://127.0.0.1:8000/api/purchases/${ID}`, { ...values }, {
			headers: { Authorization: `Bearer ${ACCESS_TOKEN.token}` },
		}
		).then((res2) => {
			if (res2.status == 200) {
				navigate('/purchases');
				toast.success("Purchased item updated successfully");
			}
		}).catch((e) => {
			if (e.response.status == 422) {
				setErrors(e.response.data.errors)
			}
		});
	}

	function handleChangeItem(e, index) {
		let changedItems = values.productsRow;
		const key = e.target.name;
		const value = e.target.value;
		if ([key] == 'product_qty') {
			if (changedItems[index]['product_stock'] >= value) {
				changedItems[index]['product_qty'] = value;
				changedItems[index]['product_total'] = changedItems[index]['product_qty'] * changedItems[index]['product_price'];
			} else {
				alert("Stock quantity exceeded");
			}
		} else {
			changedItems[index][key] = value;
		}

		setValues((values) => ({
			...values,
			productsRow: changedItems,
		}));
	}

	function destroy() {

		if (window.confirm("Are you sure you want to delete this item?")) {
			const res = axios.delete(
				`http://127.0.0.1:8000/api/purchases/${ID}`, {
				headers: { Authorization: `Bearer ${ACCESS_TOKEN.token}` },
			}
			).then((res2) => {
				if (res2.status == 200) {
					navigate('/purchases');
					toast.success("Purchased item deleted successfully");
				}
			}).catch((e) => {
				console.log(e)
			});
		}
	}

	return (
		<Layout>
			<div>
				<Helmet title={values.name} />
				<div className="mb-8 flex justify-start w-full">
					<h1 className="font-bold text-3xl">
						<Link to="/purchases" className="text-primary hover:text-secondary">
							{data.modelName}
						</Link>
						<span className="text-primary font-medium mx-2">/</span>
						{values.invoice_no}
					</h1>
				</div>

				<div className="bg-white rounded shadow max-w-3xl">
					<form onSubmit={handleSubmit}>
						<div className="p-8 -mr-6 -mb-8 flex flex-wrap">
							<DateTimeInput
								className="pr-6 pb-8 w-full lg:w-full"
								label="Purchase Date"
								name="purchase_date"
								errors={errors.purchase_date}
								value={values.purchase_date}
								onChange={handleChange}
							/>
							<TextInput
								className="pr-6 pb-8 w-full lg:w-1/2" //
								label="Invoice No"
								name="invoice_no"
								errors={errors.invoice_no}
								value={values.invoice_no}
								onChange={handleChange}
							/>
							<MultiSelectInput
								label="Supplier"
								inputId="supplier"
								id="supplier"
								instanceId="supplier"
								className="pr-6 pb-8 w-full lg:w-1/2"
								placeholder="Select supplier"
								name="supplier"
								errors={errors.supplier}
								value={findValue(values.supplier, data?.extraData?.suppliers)}
								onChange={handleChange}
								options={data?.extraData?.suppliers}
							/>


							{values.productsRow.length > 0 && values.productsRow.map((item, key) => {
								return (
									<Fragment key={key}>
										<TextInput
											className="pr-6 pb-8 w-full lg:w-1/5" //
											label="Product Name"
											name="product_name"
											value={item.product_name}
											// errors={errors ? errors?.productsRow[key].product_name : ''}
											onChange={(e) => handleChangeItem(e, key)}
										/>
										<TextInput
											className="pr-6 pb-8 w-full lg:w-1/5" //
											label="Stock"
											name="product_stock"
											type="number"
											// errors={errors.product_stock}
											value={item.product_stock}
											onChange={(e) => handleChangeItem(e, key)}
										/>
										<TextInput
											className="pr-6 pb-8 w-full lg:w-1/5" //
											label="Quantity"
											name="product_qty"
											type="number"
											value={values.productsRow[key].product_qty}
											onChange={(e) => handleChangeItem(e, key)}
										/>
										<TextInput
											className="pr-6 pb-8 w-full lg:w-1/5" //
											label="Product Price"
											name="product_price"
											type="number"
											// errors={errors.product_price}
											value={item.product_price}
											onChange={(e) => handleChangeItem(e, key)}
											disabled
										/>
										<TextInput
											className="pr-6 pb-8 w-full lg:w-1/5" //
											label="Total"
											name="product_total"
											type="number"
											value={values.productsRow[key].product_qty * item.product_price}
											// onChange={(e) => handleChangeItem(e, key)}
											disabled
										/>
									</Fragment>
								)
							})}
							<TextInput
								className="pr-6 pb-8 w-full lg:w-full" //
								label="Note"
								name="note"
								value={values.note}
								onChange={handleChange}
								multiline
							/>

						</div>
						<div className="px-8 py-4 bg-gray-100 border-t border-gray-200 flex items-center">
							<DeleteButton onDelete={destroy}>Delete</DeleteButton>
							<LoadingButton loading={sending} type="submit" className="btn-primary ml-auto">
								Update
							</LoadingButton>
						</div>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default PurchaseEdit
