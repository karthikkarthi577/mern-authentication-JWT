import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { store } from "../App";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  let [token, setToken] = useContext(store);
  let navigate = useNavigate();
  let [msg, setMsg] = useState(null);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  let { email, password } = data;
  let handleChange = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  let handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let postData = await axios.post("http://localhost:5000/api/login", data);
      setToken(postData.data);
    } catch (err) {
      setMsg(err.response.data);
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token]);
  const showToast = () => {
    toast.info(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <div>
      <ToastContainer />
      <h1 className="text">Login Page</h1>
      <div className="formContainer">
        <div className="form">
          <form onSubmit={handleSubmit} className="dataHolder">
            <input
              className="loginInput"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter Your Email"
            />
            <input
              className="loginInput"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter Your Password"
            />
            <Link to="/register" className="registerText">
              Dont Have Account? Register Here
            </Link>
            <button onClick={showToast}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
