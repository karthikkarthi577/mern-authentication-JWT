import React, { Suspense, createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Pages/Navbar";
export const store = createContext();

let LoginLazy = React.lazy(() => import("./Pages/Login"));
let ProfileLazy = React.lazy(() => import("./auth/Myprofile"));
let RegisterLazy = React.lazy(() => import("./Pages/Register"));
let NoPageFoundLazy = React.lazy(() => import("./Pages/Nopagefound"));
const App = () => {
  let [token, setToken] = useState(null);

  return (
    <div>
      <store.Provider value={[token, setToken]}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback="...Loading">
                  <LoginLazy />
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense fallback="...Loading">
                  <LoginLazy />
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <Suspense fallback="...Loading">
                  <ProfileLazy />
                </Suspense>
              }
            />
            <Route
              path="/register"
              element={
                <Suspense fallback="...Loading">
                  <RegisterLazy />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback="...Loading">
                  <NoPageFoundLazy />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </store.Provider>
    </div>
  );
};

export default App;
