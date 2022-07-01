import { HeaderHome, HeaderProduct } from "./components";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/notFound";
import Product from "./pages/dashboard/product";
import "./pages/css/style.css";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  Outlet,
} from "react-router-dom";

const RegisterLogin = () => {
  return (
    <>
      <HeaderHome />
      <div className="container-fluid d-flex flex-column justify-content-center">
        <div className="d-flex justify-content-center gap-5 mb-3 reg_column">
          <Login />
          <Register />
        </div>
      </div>
    </>
  );
};

const PrivateRoute = () => {
  const auth = sessionStorage.getItem("access_token");
  if (!auth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <HeaderProduct />
      <Outlet />
    </>
  );
};

const PageNotFound = () => {
  return (
    <>
      <HeaderHome />
      <div className="container-fluid d-flex justify-content-center gap-5 mb-3 reg_column">
        <NotFound />
      </div>
    </>
  );
};

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/Login" element={<RegisterLogin />} />
          <Route element={<PrivateRoute />}>
            <Route index path="Product" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
