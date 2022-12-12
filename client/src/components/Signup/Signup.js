import "./Signup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../axios/axios";
import { useForm } from "react-hook-form";
import { useState } from "react";

function Signup({ url }) {
  const navigate = useNavigate();
  const [repass, setRepass] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (repass) {
      Axios.post(url, data).then(({ data }) => {
        if (data.error === "Duplicate email") {
          setEmailExists(true);
          return;
        }
        navigate("/");
      });
    }
  };

  const repassCheck = () => {
    let password = document.querySelector("#register-password").value;
    let confirmPassword = document.querySelector("#register-password2").value;
    let element = document.querySelector("#CheckPasswordMatch");
    if (password !== confirmPassword || confirmPassword === "") {
      if (confirmPassword === "") {
        element.innerHTML = "";
        element.style.display = "none";
        return false;
      }
      element.style.display = "block";
      element.classList.remove("repass-error");
      element.classList.add("error");
      element.innerHTML = "Password does not match !";
      return false;
    } else {
      element.style.display = "block";
      element.classList.remove("error");
      element.classList.add("repass-error");
      element.innerHTML = "Password match !";

      return true;
    }
  };

  function rePassValidate() {
    let result = repassCheck();
    setRepass(result);
  }

  return (
    <div className="signup-card">
      <h2>Register</h2>
      <h3>Enter your credentials</h3>
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6 mb-4">
            <input
              type="text"
              placeholder="Fisrt Name"
              name="firstname"
              {...register("firstname", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            {errors?.firstname?.type === "required" && (
              <p className="error">This field is required</p>
            )}
            {errors?.firstname?.type === "maxLength" && (
              <p className="error">First name cannot exceed 20 characters</p>
            )}
            {errors?.firstname?.type === "pattern" && (
              <p className="error">Alphabetical characters only</p>
            )}
          </div>
          <div className="col-md-6 mb-4">
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              {...register("lastname", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            {errors?.lastname?.type === "required" && (
              <p className="error">This field is required</p>
            )}
            {errors?.lastname?.type === "maxLength" && (
              <p className="error">Last name cannot exceed 20 characters</p>
            )}
            {errors?.lastname?.type === "pattern" && (
              <p className="error">Alphabetical characters only</p>
            )}
          </div>
          <div className="col-md-6 mb-4">
            <input
              type="text"
              placeholder="Email Address"
              name="email"
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
          </div>
          <div className="col-md-6 mb-4">
            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              {...register("phone", {
                required: true,
                pattern:
                  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                maxLength: 10,
              })}
            />
            {errors?.phone?.type === "required" && (
              <p className="error">This field is required</p>
            )}
            {errors?.phone?.type === "pattern" && (
              <p className="error">Invalid phone format</p>
            )}
            {errors?.phone?.type === "maxLength" && (
              <p className="error">Phone contains only 10 numbers</p>
            )}
          </div>
          <div className="col-md-6">
            <input
              type="password"
              id="register-password"
              placeholder="Password"
              name="password"
              {...register("password", {
                required: true,
                min: 6,
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
              })}
            />
            {errors?.password?.type === "required" && (
              <p className="error">This field is required</p>
            )}
            {errors?.password?.type === "pattern" && (
              <p className="error">
                Password must contain atleast one letter,number and a special
                character!
              </p>
            )}
            {errors?.password?.type === "min" && (
              <p className="error">Password must have atleast 6 characters!</p>
            )}
          </div>
          <div className="col-md-6">
            <input
              type="password"
              id="register-password2"
              placeholder="Re-password"
              name="repassword"
              onKeyUp={rePassValidate}
              {...register("repassword", {
                required: true,
              })}
            />
            {errors?.repassword?.type === "required" && (
              <p className="error">This field is required</p>
            )}
            <p id="CheckPasswordMatch"></p>
          </div>
        </div>
        <button type="submit">Signup</button>
      </form>
      <div className="signup-footer">
        <h3>Already have an account?</h3>&nbsp;
        <Link to="/">Login</Link>
      </div>
      {emailExists && (
        <div class="alert alert-danger d-flex align-items-center" role="alert">
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
            <span className="mx-2">Email address already exists!</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
