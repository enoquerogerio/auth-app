import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BsEnvelope, BsKey, BsGithub, BsGoogle } from "react-icons/bs";

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const { name, password } = formData;

  const onChange = (e) =>{
    console.log(e)
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        [e.target.password]: e.target.value,
    }))
  }
  const handleSubmit = e =>{
    e.preventDefault();
    if(name.length < 6 || name.length > 50){
        console.log("")
    }
    console.log(email, password)
  }
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
              id="name"
              name="name"
              value={name}
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
            <Link to="/"><BsGithub /></Link>
            <Link to="/"><BsGoogle /></Link>
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

export default Login