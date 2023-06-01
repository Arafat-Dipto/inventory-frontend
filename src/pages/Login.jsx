import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingButton from "../Shared/LoadingButton";
import Logo from "../Shared/Logo";
import TextInput from "../Shared/TextInput";
import { AuthContext } from "../context/AuthProvider";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [values, setValues] = useState({
    email: "",
    password: "",
    // remember: true,
  });


  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  }

  const onFinish = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/auth/login",
        values
      );

      dispatch({ type: "LOGIN", payload: res.data });
      navigate("/dashboard");
      toast.success("Successfully logged in")
    } catch (e) {
      console.log('eee', e)
      if (e.response.data.status == 401) {
        setErrors(e.response.data.message)
      }
    };
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-indigo-900">
      <div className="w-full max-w-md">
        {/* <Logo
          className="block w-full max-w-xs mx-auto text-white fill-current"
          height={50}
        /> */}
        <form onSubmit={onFinish} className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-10 py-12">
            <Logo className="block mx-auto max-w-xs mb-5" />
            <h1 className="text-center font-bold text-3xl">Inventory Management System</h1>
            <div className="mx-auto mt-6 w-24 border-b-2" />
            <TextInput
              className="mt-10"
              label="Email"
              name="email"
              type="email"
              // errors={errors.email}
              value={values.email}
              onChange={handleChange}
            />
            <TextInput
              className="mt-6"
              label="Password"
              name="password"
              type="password"
              // errors={errors.password}
              value={values.password}
              onChange={handleChange}
            />
            {/* <label className="mt-6 select-none flex items-center" htmlFor="remember">
              <input name="remember" id="remember" className="mr-1" type="checkbox" checked={values.remember} onChange={handleChange} />
              <span className="text-sm">Remember Me</span>
            </label> */}
          </div>
          <div className="px-10 py-4 bg-lightBackground border-t border-border flex justify-end items-center">
            {/* <a
							className="hover:underline"
							tabIndex="-1"
							href="#reset-password"
						>
							Forget password?
						</a> */}
            <LoadingButton type="submit" className="btn-primary">
              Login
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
