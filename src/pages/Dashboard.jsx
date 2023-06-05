import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Layout from '../Shared/Layout';
import { AxiosAPI } from '../config/Api';
const Dashboard = () => {
    const [data, setData] = useState([]);

    const ACCESS_TOKEN = JSON.parse(localStorage.getItem('access_token'));

    const getDashboardData = () => {
        AxiosAPI
            .get(`/dashboard/counter`, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN.token}`
                }
            })
            .then(({ data }) => {
                setData(data.data);
            });
    }

    useEffect(() => {
        getDashboardData();
    }, []);

    return (
        <div>
            <Layout>
                <ToastContainer />
                <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
                <main className="container mx-auto py-8 px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="rounded-lg shadow p-6" style={{ backgroundColor: "#78e08f" }}>
                            <h2 className="text-xl font-semibold mb-4">Total Category</h2>
                            <p className="text-3xl font-bold">{data?.category_count}</p>
                        </div>
                        <div className="bg-orange-500 rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-4">Total Product</h2>
                            <p className="text-3xl font-bold">{data?.product_count}</p>
                        </div>
                        <div className="rounded-lg shadow p-6" style={{ backgroundColor: "#4a69bd" }}>
                            <h2 className="text-xl font-semibold mb-4">Total Supplier</h2>
                            <p className="text-3xl font-bold">{data?.supplier_count}</p>
                        </div>
                        <div className="rounded-lg shadow p-6" style={{ backgroundColor: "#e55039" }}>
                            <h2 className="text-xl font-semibold mb-4">Total Purchase</h2>
                            <p className="text-3xl font-bold">{data?.purchase_count}</p>
                        </div>
                    </div>
                </main>
            </Layout>

        </div>
    );
};

export default Dashboard;