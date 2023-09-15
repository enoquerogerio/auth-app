import React from "react";
import { BsSun, BsSunFill } from "react-icons/bs";

function Header() {
  return (
    <header className='header'>
      <button>
        <BsSun /> Dark
      </button>
    </header>
  );
}

export default Header;
