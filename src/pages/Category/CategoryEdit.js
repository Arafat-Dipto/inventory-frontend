import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteButton from "../../Shared/DeleteButton";
import Layout from "../../Shared/Layout";
import LoadingButton from "../../Shared/LoadingButton";
import { AxiosAPI } from "../../config/Api";
import Form from "./CategoryForm";

const CategoryEdit = () => {
	const params = useParams();
	const [sending, setSending] = useState(false);
	const navigate = useNavigate();
	const [errors, setErrors] = useState([]);
	const [data, setData] = useState([]);
	const [values, setValues] = useState({
		name: "",
		status: "",
	});
	const ID = params.id;
	const ACCESS_TOKEN = JSON.parse(localStorage.getItem('access_token'));
	const getCategoryById = async (ID) => {
		const res = await AxiosAPI.get(
			`/categories/${ID}/edit`, {
			headers: {
				Authorization: `Bearer ${ACCESS_TOKEN.token}`
			}
		}
		);

		setData(res.data);
		setValues({
			name: res.data.item.name,
			status: res.data.item.status
		})
	};
	useEffect(() => {
		getCategoryById(ID);
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

		const res = AxiosAPI.put(
			`/categories/${ID}`, { ...values }, {
			headers: { Authorization: `Bearer ${ACCESS_TOKEN.token}` },
		}
		).then((res2) => {
			if (res2.status == 200) {
				navigate('/categories?page=1');
				toast.success("Category updated successfully");
			}
		}).catch((e) => {
			if (e.response.status == 422) {
				setErrors(e.response.data.errors)
			}
		});
	}

	function destroy() {

		if (window.confirm("Are you sure you want to delete this item?")) {
			const res = AxiosAPI.delete(
				`/categories/${ID}`, {
				headers: { Authorization: `Bearer ${ACCESS_TOKEN.token}` },
			}
			).then((res2) => {
				console.log(res2);
				if (res2.status == 200) {
					navigate('/categories?page=1');
					toast.success("Category deleted successfully");
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
						<Link to="/categories" className="text-primary hover:text-secondary">
							{data.modelName}
						</Link>
						<span className="text-primary font-medium mx-2">/</span>
						{values.name}
					</h1>
				</div>

				<div className="bg-white rounded shadow max-w-3xl">
					<form onSubmit={handleSubmit}>
						<Form
							values={values}
							errors={errors}
							handleSubmit={handleSubmit}
							handleChange={handleChange}
						/>
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

export default CategoryEdit
