import React from "react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";

function Dropdown() {
  const dropdownRef = useRef(null);
  const [isToggleChecked, setIsToggleChecked] = useState(false);

  const handleToggleClick = () => {
    setIsToggleChecked(!isToggleChecked);
  };

  // Adicione um ouvinte de evento de clique no documento quando o componente for montado.
  React.useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsToggleChecked(!isToggleChecked);
      }
    };

    if (isToggleChecked) {
      window.addEventListener("click", handleDocumentClick);
    }

    // Remova o ouvinte de evento quando o componente for desmontado.
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, [isToggleChecked]);

  return (
    <div
      className={`dropdown-container ${isToggleChecked ? "open" : ""}`}
      onClick={handleToggleClick}
      ref={dropdownRef}>
      <div className="dropdown">
        <p id="a" href="#">
          Enoque<span>+</span>
        </p>
        <div className="menu">
          <Link id="a" to="/">
            Profile
          </Link>
          <Link id="a">Group Chat</Link>
          <Link id="a" to="/login">
            <hr />
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
