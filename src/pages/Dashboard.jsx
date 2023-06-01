import React from 'react';
import { ToastContainer } from 'react-toastify';
import Layout from '../Shared/Layout';
const Dashboard = () => {

    return (
        <div>
            <Layout>
                <ToastContainer />
                <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
                <main class="container mx-auto py-8 px-8">
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div class="rounded-lg shadow p-6" style={{ backgroundColor: "#78e08f" }}>
                            <h2 class="text-xl font-semibold mb-4">Total Products</h2>
                            <p class="text-3xl font-bold">250</p>
                        </div>
                        <div class="bg-orange-500 rounded-lg shadow p-6">
                            <h2 class="text-xl font-semibold mb-4">Total Orders</h2>
                            <p class="text-3xl font-bold">128</p>
                        </div>
                        <div class="rounded-lg shadow p-6" style={{ backgroundColor: "#4a69bd" }}>
                            <h2 class="text-xl font-semibold mb-4">Low Stock Products</h2>
                            <p class="text-3xl font-bold">15</p>
                        </div>
                        <div class="rounded-lg shadow p-6" style={{ backgroundColor: "#e55039" }}>
                            <h2 class="text-xl font-semibold mb-4">Revenue</h2>
                            <p class="text-3xl font-bold">$12,500</p>
                        </div>
                    </div>
                </main>
            </Layout>

        </div>
    );
};

export default Dashboard;