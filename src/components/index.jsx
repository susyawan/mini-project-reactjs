import "./css/style.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";

const HeaderProduct = () => {
  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    window.location = "/Product";
  };

  return (
    <>
      <div className="container-fluid bg_color">
        <div className="d-flex justify-content-between align-items-center">
          <div className="pb-3 pt-2">
            <a href="/">
              <h1 style={{ marginBottom: "0", color: "#ffffff" }}>
                Production
              </h1>
            </a>
          </div>
          <Button onClick={() => handleLogout()}>Logout</Button>
        </div>
      </div>
    </>
  );
};

const Header = () => {
  return (
    <>
      <div className="container-fluid bg_color">
        <div className="d-flex justify-content-between align-items-center">
          <div className="pb-3 pt-2">
            <a href="/">
              <h1 style={{ marginBottom: "0", color: "#ffffff" }}>
                Production
              </h1>
            </a>
            </div>
          <a href="/Login"><Button>Login</Button></a>
        </div>
      </div>
    </>
  );
};

const HeaderHome = () => {
  return (
    <>
      <div className="container-fluid bg_color">
        <div className="d-flex justify-content-between align-items-center">
          <div className="pb-3 pt-2">
            <a href="/">
              <h1 style={{ marginBottom: "0", color: "#ffffff" }}>
                Production
              </h1>
            </a>
            </div>
          <a href="/"><Button>Home</Button></a>
        </div>
      </div>
    </>
  );
};

export { Header, HeaderProduct, HeaderHome };
