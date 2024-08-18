import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isEmail } from "validator";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { edit, reset } from "../store/auth/authSlice";
import Spinner from "../components/Spinner";

function Edit() {
  const emailStored = useSelector((state) => state.auth.user.user.email);
  const firstNameStored = useSelector(
    (state) => state.auth.user.user.first_name
  );
  const lastNameStored = useSelector((state) => state.auth.user.user.last_name);
  const biographyStored = useSelector(
    (state) => state.auth.user.user.biography
  );
  const phoneStored = useSelector((state) => state.auth.user.user.phone);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    biography: "",
    phone: "",
  });

  let { email, password, first_name, last_name, biography, phone } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user.user.id) return;

    setFormData({
      email: emailStored,
      first_name: firstNameStored,
      last_name: lastNameStored,
      biography: biographyStored,
      phone: phoneStored,
    });

    if (isSuccess) {
      toast.success("Update successful");
      navigate("/");
    }

    dispatch(reset());
  }, [
    user,
    isError,
    isSuccess,
    message,
    navigate,
    dispatch,
    emailStored,
    firstNameStored,
    lastNameStored,
    biographyStored,
    phoneStored,
  ]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = false;

    if(emailStored !== email){
      if (!isEmail(email)) {
        formErrors = true;
        toast.error("Invalid e-mail");
      }
    }

    if (
      first_name.length < 3 ||
      first_name.length > 255 ||
      last_name.length < 3 ||
      last_name.length > 255
    ) {
      formErrors = true;
      toast.error(
        "The first name and last name must be between 3 and 255 characters long"
      );
    }

    if (biography.length < 10 || biography.length > 255) {
      formErrors = true;
      toast.error("The biography must be between 10 and 255 characters long");
    }

    if (!password) {
      password = undefined;
    } else {
      if (password.length < 6 || password.length > 50) {
        formErrors = true;
        toast.error("The password must be between 6 and 50 characters long");
      }
    }

    if (formErrors) return;
    if(emailStored === email){
      email = undefined
    }
    const userData = {
      email,
      password,
      first_name,
      last_name,
      biography,
      phone,
    };
    dispatch(edit(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="update-container">
        <div>
          <Link to="/">Back</Link>
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
                  value={first_name}
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
                <label>biography</label>
                <textarea
                  className="form-control"
                  id="biography"
                  name="biography"
                  value={biography}
                  placeholder="Enter your biography..."
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
                  value={email}
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
