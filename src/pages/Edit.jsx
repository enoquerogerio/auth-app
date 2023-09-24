import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isEmail } from "validator";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../store/auth/authSlice";
import Spinner from "../components/Spinner";

function Edit() {
  const emailStored = useSelector(state => state.auth.user.user.email)
  const firstNameStored = useSelector(state => state.auth.user.user.first_name)
  const lastNameStored = useSelector(state => state.auth.user)
  const bioStored = useSelector(state => state.auth.user)
  const phoneStored = useSelector(state => state.auth.user)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    bio: "",
    phone: "",
  });
  

  const { email, password, first_name, last_name, bio, phone } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("Registration successful");
      navigate("/login");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

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


    if (formErrors) return;

    const userData = { email, password };
    dispatch(register(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="update-container">
        <div>
          <Link to='/'>Back</Link>
        </div>
        <div className="">
          <span>Change Info</span>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="first_name"
                  name="first_name"
                  value={firstNameStored || ''}
                  placeholder="Enter your first Name"
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="last_name"
                  name="last_name"
                  value={last_name}
                  placeholder="Enter your last name"
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea
                  className="form-control"
                  id="bio"
                  name="bio"
                  value={bio}
                  placeholder="Enter your bio..."
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={emailStored}
                  placeholder="Enter your email..."
                  onChange={onChange}
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={phone}
                  placeholder="Enter your phone..."
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={onChange}
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-block">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Edit;
