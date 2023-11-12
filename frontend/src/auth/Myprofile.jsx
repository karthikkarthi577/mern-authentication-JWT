import React, { useContext, useEffect, useState } from "react";
import { store } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Myprofile.css";

const Myprofile = () => {
  let navigate = useNavigate();
  let [token, setToken] = useContext(store);
  let [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/myProfile", {
        headers: {
          auth: token,
        },
      })
      .then((content) => setData(content.data))
  }, []);

  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  },[token]);



  return (
    <div className="profileContainer">
      <div className="profileName">
        <p>Welcome</p>
        <h1 className="data">{data && data.name}</h1>
      </div>
      <div className="profileDetails">
        <p>Your Details</p>
        <table>
          <thead>
            <th>name</th>
            <th>email</th>
          </thead>
          <tbody>
            <tr>
              <td>{data && data.name}</td>
              <td>{data && data.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Myprofile;
