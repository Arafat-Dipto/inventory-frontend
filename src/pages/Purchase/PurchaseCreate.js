import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../../Shared/Layout";
import LoadingButton from "../../Shared/LoadingButton";
// import Form from "./PurchaseForm";
import DateTimeInput from "../../Shared/DateTimeInput";
import { findValue } from "../../Shared/Helpers";
import MultiSelectInput from "../../Shared/MultiSelectInput";
import TextInput from "../../Shared/TextInput";
import { AxiosAPI } from "../../config/Api";

const PurchaseCreate = () => {
	const [data, setData] = useState([]);
	const [sending, setSending] = useState(false);
	const [errors, setErrors] = useState([]);
	const [productList, setProductList] = useState([]);
	const navigate = useNavigate();

	const [values, setValues] = useState({
		supplier: "",
		invoice_no: "",
		product: "",
		countRows: 0,
		ids: [],
		allProduct: [],
		productsRow: [],
		note: ""
	});

	const ACCESS_TOKEN = JSON.parse(localStorage.getItem('access_token'));
	const getProducts = () => {
		AxiosAPI
			.get(`/product/list`, {
				headers: {
					Authorization: `Bearer ${ACCESS_TOKEN.token}`
				}
			})
			.then(({ data }) => {
				setValues((prev) => ({ ...prev, allProduct: data.data }));
				const options = [
					...data.data,
				].map((op) => ({
					label: op.name,
					value: op.id,
				}));
				setProductList(options);
			});
	}

	useEffect(() => {
		getProducts();
	}, []);
	const getProductData = async () => {
		const res = await axios.get(
			"http://127.0.0.1:8000/api/purchases/create", {
			headers: {
				Authorization: `Bearer ${ACCESS_TOKEN.token}`
			}
		}
		);
		setData(res.data.data)
	};

	useEffect(() => {
		getProductData();
	}, []);
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

		const res = axios.post(
			"http://127.0.0.1:8000/api/purchases", { ...values }, {
			headers: { Authorization: `Bearer ${ACCESS_TOKEN.token}` },
		}
		).then((res2) => {
			if (res2.status == 200) {
				navigate('/purchases');
				toast.success("Purchasesd item successfully");
			}
		}).catch((e) => {
			if (e.response.status == 422) {
				setErrors(e.response.data.errors)
			}
		});

	}

	//new 
	const addRow = (val) => {
		console.log('v', val)
		console.log('all', values.allProduct)
		const productName = values.allProduct.find(
			(product) => product.id === val
		);
		const getArray = {
			product_id: values.product,
			product_name: productName.name,
			product_stock: productName.stock_qty,
			product_price: productName.price,
			product_qty: 1,
			product_total: productName.price
		};

		const a = values.allProduct;
		const b = values.ids;
		b.push(val);

		const old = new Set(b.map(i => i))
		const result = a.filter(({ id }) => !old.has(id));

		const productList = result.map((op) => ({
			label: op.name,
			value: op.id,
		}));
		setProductList(productList)
		setValues((prev) => ({
			...prev,
			productsRow: [...values.productsRow, getArray],
			countRows: Object.keys(values.productsRow).length + 1,
			productList,
			product_id: '',
		}));
		return;
	};

	const removeRow = (rowNo) => {
		const totalRrows = values.productsRow;
		const deletedRow = totalRrows[rowNo];
		const b = values.ids;
		b.pop(deletedRow.product_id);
		totalRrows.splice(rowNo, 1);
		setValues((prev) => ({
			...prev,
			productsRow: [...totalRrows],
			countRows: Object.keys(totalRrows).length,
		}));
		setProductList([
			...productList,
			{ value: deletedRow.product_id, label: deletedRow.product_name },
		])
	};
	console.log('prlist', values.allProduct)
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


	return (
		<Layout>
			<div>
				<Helmet title={`Create ${data?.modelName}`} />
				<div>
					<h1 className="mb-8 font-bold text-3xl">
						<Link to="/purchases" className="text-primary hover:text-secondary">
							{data?.modelName}
						</Link>
						<span className="text-primary font-medium"> /</span> Create
					</h1>
				</div>
				<div className="bg-white rounded shadow max-w-5xl">

					<form name="createForm" onSubmit={handleSubmit}>
						<div className="p-8 -mr-6 -mb-8 flex flex-wrap">
							<DateTimeInput
								className="pr-6 pb-8 w-full lg:w-1/2"
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
								className="pr-6 pb-8 w-full lg:w-1/3"
								placeholder="Select supplier"
								name="supplier"
								errors={errors.supplier}
								value={findValue(values.supplier, data?.extraData?.suppliers)}
								onChange={handleChange}
								options={data?.extraData?.suppliers}
							/>

							<MultiSelectInput
								label="Product"
								inputId="product"
								id="product"
								instanceId="product"
								className="pr-6 pb-8 w-full lg:w-1/3"
								placeholder="Select product"
								name="product"
								errors={errors.product}
								value={findValue(values.product, data?.extraData?.products)}
								onChange={handleChange}
								options={productList}
							/>

							<div className="px-6 py-3 border-gray-200 flex items-center lg:w-1/3">
								<LoadingButton type="button" className="btn-primary" onClick={() => addRow(values.product)}>
									Add
								</LoadingButton>
							</div>

							{values.productsRow.length > 0 && values.productsRow.map((item, key) => {
								return (
									<Fragment key={key}>
										<TextInput
											className="pr-6 pb-8 w-full lg:w-1/6" //
											label="Product Name"
											name="product_name"
											value={item.product_name}
											// errors={errors ? errors?.productsRow[key].product_name : ''}
											onChange={(e) => handleChangeItem(e, key)}
										/>
										<TextInput
											className="pr-6 pb-8 w-full lg:w-1/6" //
											label="Stock"
											name="product_stock"
											type="number"
											// errors={errors.product_stock}
											value={item.product_stock}
											onChange={(e) => handleChangeItem(e, key)}
										/>
										<TextInput
											className="pr-6 pb-8 w-full lg:w-1/6" //
											label="Quantity"
											name="product_qty"
											type="number"
											value={values.productsRow[key].product_qty}
											onChange={(e) => handleChangeItem(e, key)}
										/>
										<TextInput
											className="pr-6 pb-8 w-full lg:w-1/6" //
											label="Product Price"
											name="product_price"
											type="number"
											// errors={errors.product_price}
											value={item.product_price}
											onChange={(e) => handleChangeItem(e, key)}
											disabled
										/>
										<TextInput
											className="pr-6 pb-8 w-full lg:w-1/6" //
											label="Total"
											name="product_total"
											type="number"
											value={values.productsRow[key].product_qty * item.product_price}
											// onChange={(e) => handleChangeItem(e, key)}
											disabled
										/>
										<button
											type="button"
											// className="btn btn-danger btn-sm"
											className="pr-6 pb-8 w-full lg:w-1/6"
											onClick={() => removeRow(key)}
										>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
												<path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
											</svg></button>


									</Fragment>
								)
							})}
							<TextInput
								className="pr-6 pb-8 w-full lg:w-1/2" //
								label="Note"
								name="note"
								value={values.note}
								onChange={handleChange}
								multiline
							/>

						</div>
						<div className="px-8 py-4 bg-gray-100 border-t border-gray-200 flex justify-end items-center">
							<LoadingButton loading={sending} type="submit" className="btn-primary">
								Create
							</LoadingButton>
						</div>
					</form>
				</div>
			</div>
		</Layout>
	);
};
export default PurchaseCreate;
