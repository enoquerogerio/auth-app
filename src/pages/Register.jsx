import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BsEnvelope, BsKey, BsGithub, BsGoogle } from "react-icons/bs";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const { name, password } = formData;

  const onChange = (e) =>{
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  }
  const handleSubmit = e =>{
    e.preventDefault();
    if(name.length < 6 || name.length > 50){
        console.log("")
    }
  }
  return (
    <>
      <section className="heading">
        <span>Explore More by connecting with us</span>
        <p>Join thousands of learners from around the world</p>
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
            <p>Adready a member?</p>
            <Link to="/login">
                <span className="login">Login</span>
            </Link>
        </div>
      </section>
    </>
  );
}

export default Register;
