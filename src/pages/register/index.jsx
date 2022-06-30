import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FormGroup, Input, Button } from "reactstrap";
import "../css/style.css";

import request from "../../helpers/request";
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

const validationRegister = yup.object().shape({
  usernameRegister: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Username Required"),
  address: yup.string().min(4, "Minimum 4 characters").required("Email Required"),
  phone: yup.string(),
  passwordRegister: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password Required"),
});

const Register = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const join_date = Date.now();

  const formik = useFormik({
    initialValues: {
      usernameRegister: "",
      address: "",
      phone: "",
      passwordRegister: "",
    },
    validationSchema: validationRegister,
    onSubmit: () => handleRegisterSubmit(),
  });

  const handleRegisterSubmit = async () => {
    const result = {
      username: formik.values.usernameRegister,
      address: formik.values.address,
      phone: formik.values.phone,
      password: formik.values.passwordRegister,
      join_date: join_date,
    };
    if (document.getElementById("confirmPassword").oninvalid === true) {
      document.getElementById("confirmPassword").focus();
    } else {
      await request
        .post("/register", result)
        .then((res) => {
          if (res.message === "success") {
            formik.handleReset();
            setConfirmPassword("");
            alert("Success");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const inputStyle = {
    fontSize: "18px",
  };

  const showPassword = () => {
    if (document.getElementById("passwordRegister").type === "password") {
      document.getElementById("passwordRegister").setAttribute("type", "text");
      document.getElementById("passwordRegister").focus();
    } else {
      document
        .getElementById("passwordRegister")
        .setAttribute("type", "password");
      document.getElementById("passwordRegister").focus();
    }
  };

  const resultConfirmPassword = () => {
    if (confirmPassword === "") {
      return false;
    } else if (confirmPassword === formik.values.passwordRegister) {
      return false;
    } else {
      return true;
    }
  };

  const resetField = () => {
    formik.handleReset();
    setConfirmPassword("");
  };

  return (
    <>
      <div
        className="position-relative top-0 pt-4 width_input_form"
        id="registerForm"
      >
        <h3 className="text-center mb-3">Register</h3>
        <Form>
          <FormGroup>
            <div className="py-2">
              <h6 className="px-2">
                Username :{" "}
                {formik.values.usernameRegister === "" ? null : formik.errors
                    .usernameRegister && formik.touched.usernameRegister ? (
                  <>{formik.errors.usernameRegister}</>
                ) : (
                  <>{formik.errors.usernameRegister}</>
                )}
              </h6>
              <Input
                id="usernameRegister"
                type="text"
                placeholder="Username"
                onChange={formik.handleChange}
                value={formik.values.usernameRegister}
                style={inputStyle}
                invalid={
                  formik.touched.usernameRegister &&
                  Boolean(formik.errors.usernameRegister)
                }
              />
            </div>
            <div className="py-2">
              <h6 className="px-2">
                Address :{" "}
                {formik.values.address === "" ? null : formik.errors.address &&
                  formik.touched.address ? (
                  <>{formik.errors.address}</>
                ) : (
                  <>{formik.errors.address}</>
                )}
              </h6>
              <Input
                id="address"
                type="address"
                name="address"
                placeholder="Your Address"
                onChange={formik.handleChange}
                value={formik.values.address}
                style={inputStyle}
                invalid={formik.touched.address && Boolean(formik.errors.address)}
              />
            </div>
            <div className="py-2">
              <h6 className="px-2">Phone Number :</h6>
              <Input
                id="phone"
                type="text"
                placeholder="Your Phone Number"
                onChange={formik.handleChange}
                value={formik.values.phone}
                style={inputStyle}
                invalid={formik.touched.phone && Boolean(formik.errors.phone)}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </div>
            <div className="py-2">
              <h6 className="px-2">
                Password :{" "}
                {formik.values.passwordRegister === "" ? null : formik.errors
                    .passwordRegister && formik.touched.passwordRegister ? (
                  <>{formik.errors.passwordRegister}</>
                ) : (
                  <>{formik.errors.passwordRegister}</>
                )}
              </h6>
              <div className="input-group">
                <Input
                  type="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  value={formik.values.passwordRegister}
                  style={inputStyle}
                  id="passwordRegister"
                  invalid={
                    formik.touched.passwordRegister &&
                    Boolean(formik.errors.passwordRegister)
                  }
                />
                <div className="input-group-text bg-light p-0">
                  <label className="p-1 px-3 " onClick={showPassword}>
                    #
                  </label>
                </div>
              </div>
            </div>
            <div className="py-2">
              <h6 className="px-2">Confirm Password :</h6>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                style={inputStyle}
                invalid={resultConfirmPassword()}
              />
            </div>
          </FormGroup>
          <div className="d-flex justify-content-center">
            <Button
              onClick={formik.handleSubmit}
              className="me-1"
              style={inputStyle}
            >
              Register
            </Button>
            <Button onClick={resetField} className="ms-1" style={inputStyle}>
              Reset
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
