import React from "react";
import { BsSun, BsSunFill } from "react-icons/bs";
import Dropdown from "./Dropdown";
import { useSelector, useDispatch } from "react-redux";
function Header() {
  const { user } = useSelector((state) => state.auth);
  return (
    <header className="header">
      <div className="logo">Auth-App</div>
      {user && <Dropdown />}
    </header>
  );
}

export default Header;
