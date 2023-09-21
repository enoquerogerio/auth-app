import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BsEnvelope, BsKey, BsGithub, BsGoogle } from "react-icons/bs";
import isEmail from "validator/lib/isEmail";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error("Invalid e-mail");
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error("The password must be between 6 and 50 characters long");
    }

    if (formErrors) return;
  };
  return (
    <>
      <section className="heading">
        <span>Explore More by connecting with us</span>
        <p>Login</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
      <section className="">
        <span>or continue with these social profile</span>
        <div className="social-link">
          <Link to="/">
            <BsGithub />
          </Link>
          <Link to="/">
            <BsGoogle />
          </Link>
        </div>
        <div className="">
          <p>Don’t have an account yet?</p>
          <Link to="/register">
            <span className="register">Register</span>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Login;
