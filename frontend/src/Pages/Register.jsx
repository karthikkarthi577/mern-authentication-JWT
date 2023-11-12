import axios from "axios";
import React, { useState } from "react";
import "./Register.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Register = () => {
  let [msg, setMsg] = useState(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  let { name, email, password } = data;
  let handleChange = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  let handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let postData = await axios.post(
        "http://localhost:5000/api/register",
        data
      );
      setMsg(postData.data.name);
      navigate("/login");
    } catch (err) {
      setMsg(err.response.data);
    }
  };

  const showToast = () => {
    if (
      data.name.length < 0 ||
      data.email.length < 0 ||
      data.password.length < 0
    ) {
      toast.info("fill the details completely to proceed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.success(`${msg}Registered`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <div>
      <ToastContainer />
      <h1 className="text">Register Page</h1>
      <div className="formContainer">
        <div className="form">
          <form onSubmit={handleSubmit} className="dataHolder">
            <input
              className="input"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              required
            />
            <input
              className="input"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              required
            />
            <input
              className="input"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter Your Password"
              required
            />
            <button onClick={showToast}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
