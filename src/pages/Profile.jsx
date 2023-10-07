import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { get } from "loadsh"
import { BsPerson } from "react-icons/bs";
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
          {user &&  (
            <tbody>
              <tr>
                <td>PHOTO</td>
                <th>
                  {get(user, 'user.photo' ? '' : 'user.imageUrl', false) ? (
                    <img crossOrigin="anonymous" src={user.user.imageUrl} alt=""/>
                  ) : (
                    <BsPerson size={36}/>
                  )}
                  
                </th>
              </tr>
              <tr>
                <td>NAME</td>
                <th>
                  {user.user.first_name} {user.user.last_name}
                </th>
              </tr>
              <tr>
                <td>biography</td>
                <th>{user.user.biography}</th>
              </tr>
              <tr>
                <td>PHONE</td>
                <th>{user.user.phone}</th>
              </tr>
              <tr>
                <td>EMAIL</td>
                <th>{user.user.email}</th>
              </tr>
            </tbody>
          )}
        </table>
      </section>
    </>
  );
}

export default Profile;
