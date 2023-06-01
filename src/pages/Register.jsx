import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (user) => {
    console.log("USER ::>>> ", user);

    // const res = await axios.post(
    //   "https://user-sector-app.vercel.app/auth/signup",
    //   user
    // );
    // console.log("response :::>>>", res.data);
    navigate("/login");
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-100">
      <div className="flex flex-row h-full w-full border shadow-lg">
        {/* BANNER */}
        <div
          className={`relative flex-1 bg-gradient-to-b from-blue-600 to-blue-400 hidden lg:block lg:flex lg:justify-center lg:items-center`}
        >
          <div className="font-bold text-white italic font-serif">
            <h2>"Design is intelligence made visible."</h2>
            <h2 className="ml-[150px]"> -- Alina Wheeler</h2>
          </div>
        </div>
        {/* Form */}
        <div className="w-full h-full flex-1 flex justify-center items-center bg-white">
          <div className="w-2/3">
            <h2 className="font-bold text-center mb-3 text-cyan-500">React App</h2>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button- w-full bg-blue-500"
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
            <div className="mt-8 space-x-1">
              <span className="text-neutral-500">Don't have an account?</span>

              <Link to="/login" className={`text-blue-600 font-medium`}>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
