import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Shared/Layout';
const Organization = () => {
    return (
        <div>
            <Layout>
                <h1 className="mb-8 text-3xl font-bold">Organization</h1>
                <p className="mb-12 leading-normal">
                    Hey there! Welcome to Ping CRM, a demo app designed to help illustrate
                    how
                    <a
                        className="mx-1 text-indigo-600 underline hover:text-orange-500"
                        href="https://inertiajs.com"
                    >
                        Inertia.js
                    </a>
                    works with
                    <a
                        className="ml-1 text-indigo-600 underline hover:text-orange-500"
                        href="https://reactjs.org/"
                    >
                        React
                    </a>
                    .
                </p>
                <div>
                    <Link className="mr-1 btn-indigo" to="#">
                        500 error
                    </Link>
                    <Link className="btn-indigo" to="#">
                        404 error
                    </Link>
                </div>
            </Layout>

        </div>
    );
};

export default Organization;