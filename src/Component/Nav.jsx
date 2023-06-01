import { LogoutOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Nav = () => {
    const { currentUser, dispatch } = useContext(AuthContext);
    return (
        <nav className="bg-blue-600 text-white flex justify-between px-6 py-2 font-medium">
            <Link to="/">App</Link>
            <div
                onClick={() => dispatch({ type: "LOGOUT" })}
                className="flex justify-center items-center gap-2"
            >
                <Link to="#"><LogoutOutlined /> Logout</Link>
            </div>
        </nav>
    );
};

export default Nav;