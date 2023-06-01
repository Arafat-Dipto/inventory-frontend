import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../Component/Nav";
import { AuthContext } from "../context/AuthProvider";

const Home = () => {
  const { currentUser, dispatch } = useContext(AuthContext);
  const [profile, setProfile] = useState({});

  // console.log("profile", profile);

  const TOKEN = currentUser?.token;

  // console.log(currentUser);

  const userInfo = async () => {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/me",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    console.log("USER INFO::::>>>", res.data.data);
    setProfile(res.data.data);
  };

  useEffect(() => {
    userInfo();
  }, []);
  return (
    <div>
      <Nav />

      <div className="h-screen w-screen flex justify-center items-center bg-cyan-200">
        <div className="flex flex-col bg-blue-600 w-72 rounded-md p-4 m-4 text-white">
          {/* <span>Name: {profile.username}</span>
          <span>Email: {profile.email}</span>
          <span>Sectors: {profile.sectors?.map((s) => (<span> {s.label} &nbsp;</span>))}</span> */}

          <button className="bg-gray-400 flex justify-center rounded-md p-1">
            <Link to="/form" className="gap-2">
              <EditOutlined /> Update
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
