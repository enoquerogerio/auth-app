import React from "react";
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
        dispatch(reset())
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if(isLoading){
    return <Spinner />
  }
  return <h1>Profile</h1>;
}

export default Profile;
