import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { reset } from "../store/auth/authSlice";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/login");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  
  return (
    <>
      <section>
        <table className="table-container">
          <thead>
            <tr>
              <th>Profile</th>
              <th>
                <Link id="edit" to="/edit">
                  Edit
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PHOTO</td>
              <th>Profile</th>
            </tr>
            <tr>
              <td>NAME</td>
              <th>Enoque Rogério</th>
            </tr>
            <tr>
              <td>BIO</td>
              <th>FC Barcelona</th>
            </tr>
            <tr>
              <td>PHONE</td>
              <th>943034730</th>
            </tr>
            <tr>
              <td>EMAIL</td>
              <th>{user ? user["user"].email : ''}</th>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}

export default Profile;
