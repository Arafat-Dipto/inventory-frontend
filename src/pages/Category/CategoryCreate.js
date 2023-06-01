import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../../Shared/Layout";
import LoadingButton from "../../Shared/LoadingButton";
import { AxiosAPI } from "../../config/Api";
import Form from "./CategoryForm";

const CategoryCreate = () => {
	const [data, setData] = useState([]);
	const [sending, setSending] = useState(false);
	const [errors, setErrors] = useState([]);
	const navigate = useNavigate();
	const [values, setValues] = useState({
		name: "",
		status: "1",
	});

	const ACCESS_TOKEN = JSON.parse(localStorage.getItem('access_token'));
	const getCategoryData = async () => {
		const res = await AxiosAPI.get(
			"/categories/create", {
			headers: {
				Authorization: `Bearer ${ACCESS_TOKEN.token}`
			}
		}
		);
		setData(res.data.data)
	};

	useEffect(() => {
		getCategoryData();
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
		// setSending(true);

		const res = AxiosAPI.post(
			"/categories", { ...values }, {
			headers: { Authorization: `Bearer ${ACCESS_TOKEN.token}` },
		}
		).then((res2) => {
			if (res2.status == 200) {
				navigate('/categories?page=1');
				toast.success("Category created successfully");
			}
		}).catch((e) => {
			if (e.response.status == 422) {
				setErrors(e.response.data.errors)
			}
		});

	}

	return (
		<Layout>
			<div>
				<Helmet title={`Create ${data?.modelName}`} />
				<div>
					<h1 className="mb-8 font-bold text-3xl">
						<Link to="/categories" className="text-primary hover:text-secondary">
							{data?.modelName}
						</Link>
						<span className="text-primary font-medium"> /</span> Create
					</h1>
				</div>
				<div className="bg-white rounded shadow max-w-3xl">

					<form name="createForm" onSubmit={handleSubmit}>
						<Form
							values={values}
							errors={errors}
							handleSubmit={handleSubmit}
							handleChange={handleChange}
						/>
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
export default CategoryCreate;
