import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Axios from "../../axios/axios";
import "./Login.css";

function Login({ user, url }) {
  const navigate = useNavigate();

  const [invalid, setInvalid] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (loginData) => {
    console.log(loginData);
    if (user) {
      Axios.post(url, loginData).then(({ data }) => {
        console.log(data);
        if (data.user) {
          localStorage.setItem("token", data.token);
          navigate("/home");
          return;
        }
        setInvalid(true);
      });
    } else {
      Axios.post(url, loginData).then(({ data }) => {
        console.log(data);
        if (data.admin) {
          localStorage.setItem("adminToken", data.token);
          navigate("/admin_home");
          return;
        }
        setInvalid(true);
      });
    }
  };

  return (
    <>
      {user ? (
        <div className="login-card">
          <h2>Login</h2>
          <h3>Enter your credentials</h3>
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: true,
                max: -1,
                pattern: /^\S+@\S+$/i,
              })}
            />
            {errors?.email?.type === "required" && (
              <p className="error">This field is required</p>
            )}
            {errors?.email?.type === "max" && (
              <p className="error">Invalid email format</p>
            )}
            {errors?.email?.type === "pattern" && (
              <p className="error">Invalid email format</p>
            )}
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
              })}
            />
            {errors?.password?.type === "required" && (
              <p className="error">This field is required</p>
            )}
            <a href="https://website.com">Forgot your password?</a>
            <button type="submit">LOGIN</button>
          </form>
          <div className="login-footer">
            <h3>Not registered yet?</h3>&nbsp;
            <Link to="/register">Signup</Link>
          </div>
          {invalid && (
            <div
              className="alert alert-danger d-flex align-items-center mt-2"
              role="alert"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-exclamation-triangle"
                viewBox="0 0 16 16"
              >
                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
              </svg>
              <div>
                <span className="mx-2">Invalid email or password!</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="login-card">
          <h2>Admin Login</h2>
          <h3>Enter your credentials</h3>
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              placeholder="Email Address"
              // onChange={(e) => setEmail(e.target.value)}
              {...register("email", {
                required: true,
                max: -1,
                pattern: /^\S+@\S+$/i,
              })}
            />
            {errors?.email?.type === "required" && (
              <p className="error">This field is required</p>
            )}
            {errors?.email?.type === "max" && (
              <p className="error">Invalid email format</p>
            )}
            {errors?.email?.type === "pattern" && (
              <p className="error">Invalid email format</p>
            )}
            <input
              type="password"
              placeholder="Password"
              // onChange={(e) => setPassword(e.target.value)}
              {...register("password", {
                required: true,
              })}
            />
            {errors?.password?.type === "required" && (
              <p className="error">This field is required</p>
            )}
            <a href="https://website.com">Forgot your password?</a>
            <button type="submit">LOGIN</button>
          </form>
          {invalid && (
            <div
              className="alert alert-danger d-flex align-items-center mt-2"
              role="alert"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-exclamation-triangle"
                viewBox="0 0 16 16"
              >
                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
              </svg>
              <div>
                <span className="mx-2">Invalid email or password!</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Login;
