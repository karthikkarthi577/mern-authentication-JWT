import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Register from "./Register";
import "./Navbar.css";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../App";

const Navbar = () => {
  let [token, setToken] = useContext(store);
  let [logout, setToggleOut] = useState(false);
  return (
    <div className="navContainer">
      <section className="nav">
        <div className="navIcon">StudentPortal</div>
        <div className="navListContainer">
          <ul className="navList">
            {token ? (
              <li className="logOut" onClick={() => setToken(null)}>
                Logout
              </li>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">
                  <li>Register</li>
                </Link>
              </>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
