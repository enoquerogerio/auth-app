import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../store/auth/authSlice";
function Dropdown() {
  const dropdownRef = useRef(null);
  const [isToggleChecked, setIsToggleChecked] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

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
        {user && (
          <p id="a" href="#">
          {user.user.first_name || 'guest'}<span>+</span>
          </p>
        )}
        
        <div className="menu">
          <Link id="a" to="/">
            Profile
          </Link>
          <Link id="a">Group Chat</Link>
          <button onClick={handleLogout} id="a" className="btnLogout">
            <hr />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
