import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FormGroup, Input, Button } from "reactstrap";
import "../css/style.css";

import * as yup from "yup";
import { Navigate } from "react-router-dom";
import { useFormik } from "formik";
import request from "../../helpers/request";

const validationLogin = yup.object().shape({
  username: yup.string().min(1).required("Username is required"),
  password: yup.string().min(1).required("Password is required"),
});

const Login = () => {
  const isAuth = sessionStorage.getItem("access_token");
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationLogin,
    onSubmit: () => handleLogin(),
  });

  const handleLogin = async () => {
    await request
      .post("/login", formik.values)
      .then((res) => {
        console.log("res :", res);
        sessionStorage.setItem("access_token", res.token);
      })
      .catch((err) => {
        console.log("err :", err);
      });
    if (sessionStorage.getItem("access_token"))
      window.location.href = `/Product`;
  };

  if (isAuth)
    return (
      <>
        <Navigate UsedUsername to={`/Product`} />
      </>
    );

  // const pressDown = () => {
  //   document.getElementById("password").setAttribute("type", "text");
  // };

  // const pressUp = () => {
  //   document.getElementById("password").setAttribute("type", "password");
  // };

  const showPassword = () => {
    if (document.getElementById("password").type === "password") {
      document.getElementById("password").setAttribute("type", "text");
      document.getElementById("password").focus();
    } else {
      document.getElementById("password").setAttribute("type", "password");
      document.getElementById("password").focus();
    }
  };

  const inputStyle = {
    fontSize: "18px",
  };

  return (
    <>
      <div className="position-relative top-0 pt-4 width_input_form">
        <h3 className="text-center mb-3">Login</h3>
        <Form id="formLogin">
          <FormGroup>
            <div className="py-2">
              <h6 className="px-2">
                Username :{" "}
                {formik.errors.username && formik.touched.username ? (
                  <>{formik.errors.username}</>
                ) : null}
              </h6>
              <Input
                placeholder="Username"
                id="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
                invalid={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                style={inputStyle}
              />
            </div>
            <div className="py-2">
              <h6 className="px-2">
                Password :{" "}
                {formik.errors.password && formik.touched.password ? (
                  <>{formik.errors.password}</>
                ) : null}
              </h6>
              <div className="input-group">
                <Input
                  placeholder="Password"
                  id="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  invalid={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  style={inputStyle}
                />
                <div className="input-group-text bg-light p-0">
                  <label
                    className="p-1 px-3 "
                    onClick={showPassword}
                    // onMouseDown={pressDown}
                    // onMouseUp={pressUp}
                  >
                    #
                  </label>
                </div>
              </div>
            </div>
          </FormGroup>
          <div className="d-flex justify-content-center">
            <Button
              onClick={formik.handleSubmit}
              className="me-1"
              type="submit"
              style={inputStyle}
            >
              Login
            </Button>
            <Button
              style={inputStyle}
              className="loginButton ms-1"
              onClick={formik.handleReset}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
