
import React from "react";
import { Link } from "react-router-dom";
const HomePage = () => {

    return (
        <>
            <header className="bg-gray-800 py-4">
                <div className="flex justify-between">
                    <img src="/images/uniswap-uni-logo.png" alt="" style={{ width: '35px', height: "35px" }} />
                    <Link to="/login" className="mr-5 btn btn-primary">Login</Link>
                </div>
                {/* <h1 className="text-3xl text-white text-center">Inventory Management System</h1> */}
            </header>

            <main className="container mx-auto py-8">
                <section className="py-16">
                    <h2 className="text-4xl text-center">Welcome to our Inventory Management System</h2>
                    <p className="text-lg text-center text-gray-700 mt-4">Efficiently manage your inventory with our powerful and user-friendly system.</p>
                    <a href="#features" className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full mt-8 hover:bg-blue-600">Learn More</a>
                </section>

                <section id="features" className="py-16">
                    <h2 className="text-3xl text-center">Key Features</h2>
                    <div className="flex flex-wrap justify-center mt-8">
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h3 className="text-xl font-semibold mb-4">Inventory Tracking</h3>
                                <p className="text-gray-700">Track your inventory in real-time and never run out of stock.</p>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h3 className="text-xl font-semibold mb-4">Order Management</h3>
                                <p className="text-gray-700">Manage orders efficiently and keep your customers satisfied.</p>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h3 className="text-xl font-semibold mb-4">Reporting and Analytics</h3>
                                <p className="text-gray-700">Get valuable insights with comprehensive reporting and analytics tools.</p>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h3 className="text-xl font-semibold mb-4">User-Friendly Interface</h3>
                                <p className="text-gray-700">Enjoy a sleek and intuitive interface for easy inventory management.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default HomePage;