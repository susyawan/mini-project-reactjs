import axios from "axios";

const accessToken = sessionStorage.getItem("access_token");

const request = axios.create({
  baseURL: "http://localhost:7777/",
  headers: { Authorization: accessToken },
});

request.interceptors.response.use(
  (res) => res.data,
  (err) => {
    // console.log('helper', err);

    if (err.response?.status === 409) {
      document.getElementById('usernameRegister').focus();
      alert('Your username is already registered')
    }

    if (err.response?.status === 404) {
      document.getElementById('username').focus();
      alert('Your username or password is wrong')
    }

    if (err.response?.status === 403) {
      sessionStorage.removeItem("access_token");
      window.location.href = "/";
    }
  }
);

export default request;
