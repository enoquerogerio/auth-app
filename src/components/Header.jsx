import React from "react";
import { BsSun, BsSunFill } from "react-icons/bs";
import Dropdown from "./Dropdown";
function Header() {
  return (
    <header className='header'>
      <button>
        <BsSun /> Dark
      </button>
     <Dropdown />
    </header>
  );
}

export default Header;
