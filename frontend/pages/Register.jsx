import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isEmail } from "validator";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsEnvelope, BsKey, BsGithub, BsGoogle } from "react-icons/bs";
import { register, reset } from "../store/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success('Registration successful')
      navigate("/login");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

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

    const userData = { email, password };
    dispatch(register(userData));
  };

  if(isLoading){
    return <Spinner />
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
